import WLRound from './WLRound'
import WLFinalRound from './WLFinalRound'
import { WLContestant, WLGameState, WLChain } from '@/types/WeakestLink'
import store from '@/store'
import WLScript from './WLScript'
import { WLDisplayMoney, sleep } from './helper'
import WLAudio from './WLAudio'
import WLDirector from './WLDirector'
import WLSettings from './WLSettings'

export default class WLGame {

	public contestants: WLContestant[]		// List of contestants
	public roundNumber: number				// Current round (0 = pre game)
	public totalBanked: number				// Total amount banked for entire game
	public round: WLRound					// Current round
	public finalRound: WLFinalRound			// Final round
	private currentlyVoting = false			// Used for monitoring voting phase - so it can be cancelled
	private votingDiscussion: number = null	// Post voting discussion period start time
	public namePlaque: string				// Used show name at bottom

	public constructor(contestants: WLContestant[], roundNumber: number = 0, totalBanked: number = 0) {
		this.contestants = contestants
		this.roundNumber = roundNumber
		this.totalBanked = totalBanked
		this.save()
	}

	public startRound() {
		this.roundNumber++
		store.commit('wlSetScreenState', 'round')
		this.round = new WLRound(this)
	}

	public startFinalRound() {
		store.commit('wlSetScreenState', 'finalRound')
		this.finalRound = new WLFinalRound(this, this.currentContestants)
		this.save()
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

		this.totalBanked += this.round.banked * this.round.multiplier
		store.commit('wlSetScreenState', 'nothing')

		if (this.round.final) {
			WLScript.set(`
				Between you, you banked ${WLDisplayMoney(this.round.banked)}, which we will treble.
				<div>That means the grand total today is ${WLDisplayMoney(this.totalBanked)}.</div>
				<div>
					But, there can only be one winner!
					Now we move on to the final round.
					You will have five questions each, if there's a tie;
					we'll go to sudden death.
				</div>
			`)
			store.commit('wlSetScreenState', 'showTotal')
		} else if (this.round.banked === this.round.max) {
			WLScript.set(`
				Congratulations - you managed to reach your target, but:<br />
				${WLScript.getInsult()}<br />
				${WLScript.getInsult()}<br />
				It's time to vote off - the weakest link
			`)
		} else {
			if (this.round.longestChain >= WLChain.length) {
				WLScript.set(`
					You won ${WLDisplayMoney(this.round.banked)}.<br/>
					But you had a chain of ${WLChain.length} correct answers,
					you could have reached the ${WLDisplayMoney(WLChain[WLChain.length - 1])} target.<br />
					${WLScript.getInsult()}<br/>
					${WLScript.getInsult()}<br />
					It's time to vote off - the weakest link
				`)
			} else {
				WLScript.set(`
					You won just ${WLDisplayMoney(this.round.banked)}.
					<div>
						${WLScript.getInsult()}<br/>
						${WLScript.getInsult()}<br />
						It's time to vote off - the weakest link
					</div>
				`)
			}
		}
		this.round = null
		this.save()
	}

	public endFinalRound() {
		this.finalRound = null
		store.commit('wlSetScreenState', 'showTotal')
		this.save()
	}

	public cancel() {
		this.round = null
		this.finalRound = null
		WLScript.set(WLScript.empty)
		WLAudio.stop()
		store.commit('wlSetScreenState', 'nothing')
		this.save()
	}

	public vote(name: string, out: boolean) {
		const contestant = this.contestants.find((c) => c.name === name)
		contestant.out = out
		contestant.outTime = out ? Date.now() : null
		this.save()
	}

	public save() {
		store.commit('wlSetGame', JSON.parse(JSON.stringify(this.data)))
	}

	public async voting() {
		this.currentlyVoting = true
		this.save()
		store.commit('wlSetScreenState', 'voting')
		WLAudio.voting()
		const votingTime = 26500
		for (let i = 0; i < votingTime; i += 500) {
			if (this.currentlyVoting) {
				WLScript.set(`<em>[ Contestants are voting - ${Math.ceil((votingTime - i) / 1000)}s ]</em>`)
				if (i % 2000 === 0) {
					WLDirector.set(
						this.currentContestants[(i / 2000) % this.currentContestants.length].googleName
					)
				}
				await sleep(500)
			}
		}
		if (this.currentlyVoting) {
			WLDirector.set(WLSettings.hostGoogle)
			WLScript.set(`Voting over, it's time to reveal who you think is the Weakest Link?`)
			await sleep(4500)
			WLAudio.sting()
			await sleep(2500)
		}
		this.revealVoting()
	}

	public async revealVoting() {
		for (let i = 0; i < this.currentContestants.length; i++) {
			WLDirector.set(this.currentContestants[i].googleName)
			WLScript.set(`<em>[ ${this.currentContestants[i].name} shows vote ]</em>`)
			this.namePlaque = this.currentContestants[i].name
			this.save()
			await sleep(5000)
		}
		this.namePlaque = null
		this.save()
		WLAudio.sting()
		await sleep(3000)
		this.stopVoting()
	}

	public async stopVoting() {
		if (this.currentlyVoting) {
			WLDirector.set('free')
			this.namePlaque = null
			this.currentlyVoting = false
			store.commit('wlSetScreenState', 'nothing')
			this.votingDiscussion = Date.now()
			while (this.votingDiscussion !== null) {
				WLScript.set(`
					...<br />
					...<br />
					NAME you are the weakest link - goodbye!<br/>
					<em>[ Discussion timer: ${Math.floor((Date.now() - this.votingDiscussion) / 1000)}s ]</em>
				`)
				await sleep(1000)
			}
			WLAudio.stop()
			this.save()
		}
	}

	public async walkOfShame() {
		this.votingDiscussion = null
		WLAudio.walkOfShame()
	}

	public get data(): WLGameState {
		return {
			contestants: this.contestants,
			roundNumber: this.roundNumber,
			totalBanked: this.totalBanked,
			round: this.round ? this.round.data : this.round,
			finalRound: this.finalRound ? this.finalRound.data : this.finalRound,
			strongest: this.strongest,
			currentlyVoting: this.currentlyVoting,
			namePlaque: this.namePlaque
		}
	}

}
