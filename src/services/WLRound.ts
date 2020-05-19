import WLGame from './WLGame'
import WLScript from './WLScript'
import WLQuestions from './WLQuestions'
import WLAudio from './WLAudio'
import { WLBaseTime, WLTimeReduction, WLChain, WLRoundState } from '@/types/WeakestLink'
import { sleep } from '@/services/helper'

export default class WLRound {
	public game: WLGame					// The game
	public banked: number = 0			// Total banked for this round
	public started: boolean = false		// Has the round actually started (after music)
	public questionStart: number		// Timestamp when last questions was asked
	public timer: number				// Current time
	public contestant: number			// Current contestant in rotation
	public chainPosition: number = 0	// What position is the chain
	public timeoutId: number			// Keeps track of timeout
	private eventListenerWrapper

	public get data(): WLRoundState {
		return {
			banked: this.banked,
			started: this.started,
			questionStart: this.questionStart,
			timer: this.timer,
			contestant: this.contestant,
			chainPosition: this.chainPosition,
			timeoutId: this.timeoutId,
			value: this.value,
			max: this.max,
			currentContestant: this.currentContestant
		}
	}


	public constructor(game: WLGame) {
		// Setup vars
		this.game = game

		// Setup listeners
		this.eventListenerWrapper = (event) => {
			if (this.started && event.code === 'Space') this.right()
			else if (this.started && event.code === 'Enter') this.wrong()
			else if (this.started && event.code === 'KeyB') this.bank()
		}
		window.addEventListener('keypress', this.eventListenerWrapper)

		// First player
		this.contestant = this.game.contestants.findIndex((c) => c.name === this.game.strongest[0].name)

		// Reset players
		this.game.contestants.forEach((c) => {
			c.right = 0
			c.time = 0
			c.banked = 0
			c.lost = 0
			c.total = 0
		})

		// Setup timer
		this.timer = WLBaseTime - WLTimeReduction * (this.game.roundNumber - 1)

		// Start
		this.start()
		this.save()
	}

	public save() {
		this.game.save()
	}

	public getQuestion() {
		const question = WLQuestions.getQuestion(this.game.roundNumber)
		WLScript.set(`
			<div>${this.currentContestant.name}, ${question.q}</div>
			<div class="answer">${question.a}</div>
		`)
	}

	public endQuestion() {
		this.currentContestant.time += Date.now() - this.questionStart
		this.save()
	}

	public nextQuestion() {
		this.endQuestion()
		this.questionStart = Date.now()
		this.nextContestant()
		this.getQuestion()
		this.save()
	}

	public nextContestant() {
		// TODO - stop infinite loop if there are no contestants
		do {
			this.contestant = (this.contestant + 1) % this.game.contestants.length
		} while (this.currentContestant.out)
	}

	public right() {
		if (this.chainPosition === 0) {
			this.chainPosition++
		} else {
			this.chainPosition = Math.min(WLChain.length, this.chainPosition + 0.5)
			setTimeout(() => {
				this.chainPosition = Math.min(WLChain.length, this.chainPosition + 0.5)
				this.save()
			}, 300)
		}
		this.currentContestant.right++
		this.currentContestant.total++
		this.nextQuestion()
	}

	public wrong() {
		this.currentContestant.total++
		const lost = Math.min(this.value, this.max - this.banked)
		this.currentContestant.lost += lost
		this.chainPosition = 0
		this.nextQuestion()
	}

	public bank() {
		const before = this.banked
		this.banked = Math.min(this.banked + this.value, this.max)
		this.currentContestant.banked += this.banked - before
		this.chainPosition = 0
		console.log(this.banked, this.max)
		if (this.banked >= this.max) {
			WLAudio.endRound()
			this.end()
		}
		this.save()
	}

	public runTimer() {
		if (this.started) {
			this.timer--
		}
		if (this.timer <= 0) {
			this.timer = 0
			this.end()
		} else {
			this.timeoutId = setTimeout(() => this.runTimer(), 1000)
		}
		this.save()
	}

	public async start() {
		WLScript.set(WLScript.startRound)
		await this.startMusic()
		this.started = true
		this.getQuestion()
		this.questionStart = Date.now()
		setTimeout(() => this.runTimer(), 1000)
		this.save()
	}

	public async startMusic() {
		WLAudio.round(this.timer)
		await sleep(2000)
		WLScript.set(WLScript.startClock)
		await sleep(1500)
		WLScript.set(WLScript.empty)
	}

	public async end() {
		// 	this.reallyStarted = false
		// 	this.endQuestion()
		// 	this.music.currentTime = 310.3
		// 	this.script = Script.empty
		// 	await sleep(3500)
		// 	this.script = Script.endOfRound
		// 	this.total += this.banked
		// 	this.started = false
		window.removeEventListener('keypress', this.eventListenerWrapper)
		clearTimeout(this.timeoutId)
		this.game.endRound()
		this.save()
	}

	public get value() {
		return WLChain[Math.ceil(this.chainPosition - 1)] || 0
	}

	public get max() {
		return WLChain[WLChain.length - 1]
	}

	public get currentContestant() {
		return this.game.contestants[this.contestant]
	}
}
