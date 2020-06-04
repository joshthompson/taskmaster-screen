import WLGame from '@/services/wl/WLGame'
import WLScript from '@/services/wl/WLScript'
import WLQuestions from '@/services/wl/WLQuestions'
import WLAudio from '@/services/wl/WLAudio'
import Director from '@/services/shared/Director'
import { WLRoundState } from '@/types/WeakestLink'
import { sleep } from '@/services/shared/helper'
import WLSettings from '@/services/wl/WLSettings'

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
	public currentChain: number = 0		// Current chain length (doesn't reset with bank)
	public longestChain: number = 0		// Longest chain - just used for mocking contestants
	public final: boolean = false		// Is this the final normal round
	public multiplier: number = 1		// Multiplier - used to triple final normal round

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
		this.timer = WLSettings.roundBaseTime - WLSettings.roundTimeReduction * (this.game.roundNumber - 1)

		// Check if final normal round
		if (this.currentContestants.length === 2) {
			this.timer = WLSettings.finalRoundTime
			this.multiplier = 3
			this.final = true
		}

		// Start
		this.start()
		this.save()
	}

	public save() {
		this.game.save()
	}

	public get currentContestants() {
		return this.game.contestants.filter((c) => !c.out)
	}

	public getQuestion() {
		const question = WLQuestions.getQuestion(this.game.roundNumber)

		if (Math.random() < 0.2) {
			Director.set(WLSettings.hostGoogle)
			setTimeout(() => Director.set(this.currentContestant.googleName), 3000)
		} else {
			Director.set(this.currentContestant.googleName)
		}
		WLScript.set(`
			<div>${this.currentContestant.name}: ${question.question}</div>
			<div class="answer">${question.answer}</div>
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
			this.chainPosition = Math.min(WLSettings.chain.length, this.chainPosition + 0.5)
			setTimeout(() => {
				this.chainPosition = Math.min(WLSettings.chain.length, this.chainPosition + 0.5)
				this.save()
			}, 300)
		}
		this.currentContestant.right++
		this.currentContestant.total++
		this.currentChain++
		this.longestChain = Math.max(this.longestChain, this.currentChain)
		this.nextQuestion()
	}

	public wrong() {
		this.currentContestant.total++
		const lost = Math.min(this.value, this.max - this.banked)
		this.currentContestant.lost += lost
		this.chainPosition = 0
		this.currentChain = 0
		this.nextQuestion()
	}

	public bank() {
		const before = this.banked
		this.banked = Math.min(this.banked + this.value, this.max)
		this.currentContestant.banked += this.banked - before
		this.chainPosition = 0
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
		await sleep(2000)
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
		Director.set('free')
		window.removeEventListener('keypress', this.eventListenerWrapper)
		clearTimeout(this.timeoutId)
		this.game.endRound()
		this.save()
	}

	public get value() {
		return WLSettings.chain[Math.ceil(this.chainPosition - 1)] || 0
	}

	public get max() {
		return WLSettings.chain[WLSettings.chain.length - 1]
	}

	public get currentContestant() {
		return this.game.contestants[this.contestant]
	}
}
