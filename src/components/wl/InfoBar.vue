<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { WLContestant, WLScreenState } from '@/types/WeakestLink'
	import ContestantsList from '@/components/wl/ContestantsList.vue'
	import WLGame from '@/services/wl/WLGame'
	import { WLDisplayMoney, sleep } from '@/services/shared/helper'
	import WLAudio from '@/services/wl/WLAudio'
	import Director from '@/services/shared/Director'
	import WLScript from '@/services/wl/WLScript'
	import { AppState } from '@/types'
	import WLSettings from '@/services/wl/WLSettings'

	@Component({
		components: { ContestantsList }
	})
	export default class InfoBar extends Vue {

		public gameObj: WLGame = null
		public contestantNames: string
		public total: number = 0
		public round: number = 1

		public created() {
			Director.set('free')
			// this.contestantNames = 'Josh Testerson=Josh,Craig Testersson=Craig'
			// this.contestantNames = `
			// 	Holly Young=Holly
			// 	Paul Barratt=Paul
			// 	Sarah Bell=Sarah,Esther Akinfenwa=Esther
			// 	Vicki Kiely=Vicki
			// 	Nick Pearson=Nick
			// 	Tanya Alam=Tanya
			// 	Leo Baines Jump=Leo
			// `
			this.contestantNames = `
				Anne Gauthier=Anne
				Jack Davis=Jack
				Guy Stephens=Guy
				Lisa Reinfelder=Lotte
				James Rogers=James
				Pete Siret=Peter
				Rebekah Shah=Rebekah
				Nick Mytton=Nick
			`
		}

		public get game() {
			return (this.$store.state as AppState).wl.game
		}

		public get screenState() {
			return (this.$store.state as AppState).wl.screenState
		}

		public get director() {
			return (this.$store.state as AppState).wl.director
		}

		public get volume() {
			return (this.$store.state as AppState).volume
		}

		public setVolume(event) {
			WLAudio.setVolume(parseFloat(event.target.value))
		}

		public money(value) {
			return WLDisplayMoney(value)
		}

		public setupGame() {
			// Create contestants
			const contestants = this.contestantNames
				.split(',')
				.map((n): WLContestant => ({
					name: n.trim().split(' ')[0].split('=')[0],
					fullName: n.trim().split('=')[0],
					googleName: n.trim().split('=')[1],
					out: false
				}))
				.sort((a, b) => a.name > b.name ? 1 : -1)
			// Create game
			this.gameObj = new WLGame(contestants, this.round - 1, this.total)
		}

		public startRound() {
			this.gameObj.startRound()
		}

		public startFinalRound() {
			this.gameObj.startFinalRound()
		}

		public voting() {
			this.gameObj.voting()
		}

		public stopVoting() {
			this.gameObj.stopVoting()
		}

		public cancel() {
			this.gameObj.cancel()
		}

		public setScreenState(state: WLScreenState) {
			this.$store.commit('wlSetScreenState', state)
		}

		public get showActions() {
			return this.game
				&& !this.game.round
				&& this.screenState !== 'voting'
				&& this.screenState !== 'finalRound'
				&& this.screenState !== 'round'
		}

		public get showRoundActions() {
			const r = this.game?.round || this.game?.finalRound
			return r && r.started
		}

		public get showFinalRoundPersonActions() {
			return this.screenState === 'finalRound'
				&& !this.game.finalRound.ready
		}

		public right() {
			(this.gameObj.round || this.gameObj.finalRound).right()
		}

		public wrong() {
			(this.gameObj.round || this.gameObj.finalRound).wrong()
		}

		public bank() {
			this.gameObj.round.bank()
		}

		public nothing() {
			this.setScreenState('nothing')
			WLAudio.stop()
			Director.set('free')
		}

		public async walkOfShame() {
			this.setScreenState('nothing')
			this.gameObj.walkOfShame()
			const out = this.game.contestants.filter((c) => c.out).sort((a, b) => a.outTime > b.outTime ? -1 : 1)[0]
			Director.set(out?.googleName || 'free')
			WLScript.set('<em>[ Vote out interview ]</em>')

			await sleep(10000)
			Director.set('free')

			if (this.game.roundNumber === 1) {
				WLScript.set(`
					So we move to Round ${this.game.roundNumber + 1} and take ${WLSettings.roundTimeReduction} seconds off the clock.
				`)
			} else if (this.game.roundNumber === this.game.contestants.length - 1) {
				WLScript.set(`
					One last timed round of questions, this time you'll have ${WLSettings.finalRoundTime} seconds.<br />
					Whatever is earned in this round will be trebled.
				`)
			} else {
				WLScript.set(`
					So we move to Round ${this.game.roundNumber + 1}, ${WLSettings.roundTimeReduction} more seconds come off the clock
				`)
			}

			if (!this.game.prevStrongest.out) {
				WLScript.add(`<br/>We'll start with the strongest link from the last round - that's ${this.game.prevStrongest.name}`)
			} else {
				WLScript.add(`<br/>You voted off the strongest link so we'll start with the second strongest - that's ${this.game.prev2ndStrongest.name}`)
			}
		}

	}
</script>

<template>
	<div class="info-bar">
		<h2>
			<span>Weakest Link</span>
			<span v-if="game && game.roundNumber > 0">: Round {{ game.roundNumber }}</span>
		</h2>

		<h3>Director: {{ director }}</h3>

		<div v-if="!game">
			<textarea type="text" v-model="contestantNames"></textarea>
			<p>Banked: <input type="text" v-model="total" /></p>
			<p>Round: <input type="text" v-model="round" /></p>
			<p><button @click="setupGame" class="btn">Setup Game</button></p>
		</div>

		<div v-if="game">
			<h3>Total: {{ money(game.totalBanked) }}</h3>
		</div>
		<ContestantsList :gameObj="gameObj" />

		<div class="actions" v-if="showActions">
			<button @click="startRound" class="btn large">Start Round</button>
			<button @click="startFinalRound" class="btn large">Final Round</button>
			<button @click="voting" class="btn large">Voting</button>
			<button @click="setScreenState('intro')" class="btn large">Intro</button>
			<button @click="walkOfShame" class="btn large">Walk Of Shame</button>
			<button @click="setScreenState('showTotal')" class="btn large">Show Total</button>
			<button @click="nothing" class="btn large">Nothing</button>
			<button @click="setScreenState('showLogo')" class="btn large">Show Logo</button>
			<button @click="setScreenState('credits')" class="btn large">Show Credits</button>
		</div>

		<div class="round-actions" v-if="showRoundActions">
			<button @click="right" class="btn large">Right (Space)</button>
			<button @click="wrong" class="btn large">Wrong (Enter)</button>
			<button @click="bank" class="btn large" v-if="screenState === 'round'">Bank (B)</button>
			<button @click="cancel" class="btn large">Cancel Round</button>
		</div>

		<div class="voting-actions" v-if="screenState === 'voting'">
			<button @click="stopVoting" class="btn large">Stop Voting</button>
		</div>

		<div class="final-round-actions" v-if="showFinalRoundPersonActions">
			<h3>Who will go first?</h3>
			<button @click="gameObj.finalRound.startPlayer1()" class="btn large">
				{{ gameObj.finalRound.player1.name }}
			</button>
			<button @click="gameObj.finalRound.startPlayer2()" class="btn large">
				{{ gameObj.finalRound.player2.name }}
			</button>
		</div>

		<div>
			<h3>Volume</h3>
			<input type="range" min="0" max="1" step="0.01" :value="volume" @change="setVolume" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	
	.info-bar {
		position: absolute;
		z-index: 100;
		top: 0;
		right: 0;
		width: calc(100vw - #{$width});
		height: 100vh;
		background: #444444;
		color: #FFFFFF;
		padding: 1rem;
		overflow: auto;

		h2 {
			margin: 0 0 1rem;
		}

		textarea {
			padding: 0.5rem;
			width: 100%;
			font-size: 1rem;
			min-height: 3.5rem;
			resize: vertical;
		}
	}
</style>
