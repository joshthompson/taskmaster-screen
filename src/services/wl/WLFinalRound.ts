import WLGame from '@/services/wl/WLGame'
import { WLContestant, WLFinalRoundState } from '@/types/WeakestLink'
import WLAudio from '@/services/wl/WLAudio'
import { sleep, WLDisplayMoney } from '@/services/shared/helper'
import WLScript from '@/services/wl/WLScript'
import WLQuestions from '@/services/wl/WLQuestions'
import Director from '@/services/shared/Director'
import WLSettings from '@/services/wl/WLSettings'

export default class WLFinalRound {
	public game: WLGame
	public player1: WLContestant
	public player2: WLContestant
	public started: boolean = false
	public questionNumber: number = 0
	public suddenDeath: boolean = false
	public ready: boolean = false
	private eventListenerWrapper

	public results: boolean[][] = [
		[null, null],
		[null, null],
		[null, null],
		[null, null],
		[null, null]
	]

	public constructor(game: WLGame, contestants: WLContestant[]) {
		this.game = game
		this.player1 = contestants[0]
		this.player2 = contestants[1]

		this.eventListenerWrapper = (event) => {
			if (this.started && event.code === 'Space') this.right()
			else if (this.started && event.code === 'Enter') this.wrong()
		}
		window.addEventListener('keypress', this.eventListenerWrapper)

		this.start()
	}

	public async start() {
		WLScript.set(`So, ${this.player1.name} and ${this.player2.name}; lets play The Weakest Link.</div>`)
		await sleep(3000)
		WLAudio.finalRound1()
		await sleep(3000)
		WLScript.set(`As the strongest link in the last round ${this.player1.name} you will have the choice of who goes first?`)
		while (!this.ready) {
			await sleep(100)
		}
		WLAudio.finalRound2()
		WLScript.set(WLScript.empty)
		await sleep(3000)
		this.getQuestion()
		this.started = true
		this.save()
	}

	public startPlayer1() {
		this.ready = true
	}

	public startPlayer2() {
		const p1 = this.player2
		const p2 = this.player1
		this.player1 = p1
		this.player2 = p2
		this.ready = true
	}

	public right() {
		this.results[Math.floor(this.questionNumber / 2)][this.questionNumber % 2] = true
		this.nextQuestion()
	}

	public wrong() {
		this.results[Math.floor(this.questionNumber / 2)][this.questionNumber % 2] = false
		this.nextQuestion()
	}

	public async nextQuestion() {
		if (this.checkWinner()) {
			return true
		}
		if (this.questionNumber === 9) {
			await this.startSuddenDeath()
		}
		if (this.questionNumber >= 9 && this.questionNumber % 2 === 1) {
			this.results.push([null, null])
		}
		this.questionNumber++
		this.getQuestion()
		this.save()
	}

	public checkWinner() {
		const p1min = this.results.map((r): number => r[0] === true ? 1 : 0).reduce((a, b) => a + b, 0)
		const p1max = this.results.map((r): number => r[0] !== false ? 1 : 0).reduce((a, b) => a + b, 0)
		const p2min = this.results.map((r): number => r[1] === true ? 1 : 0).reduce((a, b) => a + b, 0)
		const p2max = this.results.map((r): number => r[1] !== false ? 1 : 0).reduce((a, b) => a + b, 0)
		if (p2max < p1min) {
			this.end(this.player1, this.player2)
			return 1
		} else if (p1max < p2min) {
			this.end(this.player2, this.player1)
			return 2
		} else {
			return 0
		}
	}

	public async startSuddenDeath() {
		this.save()
		WLScript.set(`
			So after 5 questions, your scores are tied.<br/>
			Therefore ${this.player1.name} and ${this.player2.name}, let's play sudden death.
		`)
		await sleep(6000)
		WLAudio.suddenDeath()
		this.suddenDeath = true
		this.save()
	}

	public async end(winner: WLContestant, loser: WLContestant) {
		Director.set('free')
		WLAudio.winner()
		WLScript.set(`
			That means ${winner.name}, you are today's strongest link and you
			go away with ${WLDisplayMoney(this.game.totalBanked)}.<br/>
			${loser.name}, you leave with nothing.<br/>
			Join us again for The Weakest Link. Goodbye (<em>wink</em>)
		`)
		this.save()
		await sleep(3000)
		this.started = false
		this.game.endFinalRound()
	}

	public get currentContestant() {
		return this.questionNumber % 2 === 0 ? this.player1 : this.player2
	}

	public getQuestion() {
		const question = WLQuestions.getQuestion('final')
		const name = this.questionNumber % 2 === 0 ? this.player1.name : this.player2.name
		Director.set(WLSettings.hostGoogle)
		setTimeout(() => Director.set(this.currentContestant.googleName), 2000)

		WLScript.set(`
			<div>${name}: ${question.question}</div>
			<div class="answer">${question.answer}</div>
		`)
	}

	public save() {
		this.game.save()
	}

	public get data(): WLFinalRoundState {
		return {
			player1: this.player1,
			player2: this.player2,
			questionNumber: this.questionNumber,
			results: this.results,
			started: this.started,
			suddenDeath: this.suddenDeath,
			ready: this.ready
		}
	}

}
