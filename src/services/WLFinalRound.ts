import WLGame from './WLGame'
import { WLContestant, WLFinalRoundState } from '@/types/WeakestLink'
import WLAudio from './WLAudio'
import { sleep, WLDisplayMoney } from './helper'
import WLScript from './WLScript'
import WLQuestions from './WLQuestions'

export default class WLFinalRound {
	public game: WLGame
	public player1: WLContestant
	public player2: WLContestant
	public started: boolean = false
	public questionNumber: number = 0
	public suddenDeath: boolean = false
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
		WLAudio.finalRound()
		await sleep(3000)
		WLScript.set(`As the strongest link in the last round ${this.player1.name} will go first`)
		await sleep(6000)
		this.getQuestion()
		this.started = true
		this.save()
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
			So after 5 questions each your scores are tied.<br/>
			Therefore ${this.player1.name} and ${this.player2.name}, let's play sudden death.
		`)
		await sleep(6000)
		WLAudio.suddenDeath()
		this.suddenDeath = true
		this.save()
	}

	public async end(winner: WLContestant, loser: WLContestant) {
		WLAudio.winner()
		WLScript.set(`
			That means ${winner.name}, that you are todays strongest link and you
			go away with ${WLDisplayMoney(this.game.totalBanked)}.<br/>
			${loser.name}, you leave with nothing.<br/>
			Join us again for The Weakest Link. Goodbye (<em>wink</em>)
		`)
		this.save()
		await sleep(3000)
		this.started = false
		this.game.endFinalRound()
	}

	public getQuestion() {
		const question = WLQuestions.getQuestion('final')
		WLScript.set(`
			<div>${this.player1.name}, ${question.q}</div>
			<div class="answer">${question.a}</div>
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
			suddenDeath: this.suddenDeath
		}
	}

}
