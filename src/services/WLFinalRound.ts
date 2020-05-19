import WLGame from './WLGame'
import { WLContestant, WLFinalRoundState } from '@/types/WeakestLink'

export default class WLFinalRound {
	public game: WLGame
	public player1: WLContestant
	public player2: WLContestant
	public started: boolean = false
	public questionNumber: number = 0
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

	public start() {
		this.started = true
	}

	public right() {
		this.results[Math.floor(this.questionNumber / 2)][this.questionNumber % 2] = true
		this.nextQuestion()
	}

	public wrong() {
		this.results[Math.floor(this.questionNumber / 2)][this.questionNumber % 2] = false
		this.nextQuestion()
	}

	public nextQuestion() {
		// Todo - do we have a winner?
		// Todo - Sudden death?
		this.questionNumber++
		this.save()
	}

	public save() {
		this.game.save()
	}

	public get data(): WLFinalRoundState {
		return {
			player1: this.player1,
			player2: this.player2,
			questionNumber: this.questionNumber,
			results: this.results
		}
	}
	
	public 

}
