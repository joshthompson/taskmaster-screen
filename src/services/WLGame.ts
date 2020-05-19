import WLRound from './WLRound'
import { WLContestant, WLGameState } from '@/types/WeakestLink'
import store from '@/store'

export default class WLGame {

	public contestants: WLContestant[]	// List of contestants
	public roundNumber: number			// Current round (0 = pre game)
	public totalBanked: number			// Total amount banked for entire game
	public round: WLRound				// Current

	public constructor(contestants: WLContestant[], roundNumber: number = 0, totalBanked: number = 0) {
		this.contestants = contestants
		this.roundNumber = roundNumber
		this.totalBanked = totalBanked
		this.save()
	}

	public startRound() {
		this.roundNumber++
		this.round = new WLRound(this)
	}

	public startFinalRound() {
		
	}

	public get currentContestants() {
		return this.contestants.filter((c) => !c.out)
	}

	public get strongest() {
		return this.currentContestants.sort((a, b) => {
			// Percentage of questions right
			if (a.right / a.total < b.right / b.total) return 1
			if (a.right / a.total > b.right / b.total) return -1

			// Banked more
			if (a.banked < b.banked) return 1
			if (a.banked > b.banked) return -1

			// Lost less
			if (a.lost > b.lost) return 1
			if (a.lost < b.lost) return -1

			// Time
			if (a.time / a.total > b.time / b.total) return 1
			if (a.time / a.total < b.time / b.total) return -1

			// More questions
			if (a.total < b.total) return 1
			if (a.total > b.total) return -1

			// IDENTICAL!
			return 0
		})
	}

	public endRound() {
		this.totalBanked += this.round.banked
		this.round = null
	}

	public vote(name: string, out: boolean) {
		const contestant = this.contestants.find((c) => c.name === name)
		contestant.out = out
		contestant.outTime = out ? Date.now() : null
		this.save()
	}

	public save() {
		store.commit('wlSetGame', this.data)
	}

	public get data(): WLGameState {
		return JSON.parse(JSON.stringify({
			contestants: this.contestants,
			roundNumber: this.roundNumber,
			totalBanked: this.totalBanked,
			round: this.round ? this.round.data : this.round,
			strongest: this.strongest
		}))
	}

}
