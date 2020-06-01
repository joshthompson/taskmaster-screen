<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { WLState, WLContestant, WLScreenState } from '@/types/WeakestLink'
	import ContestantsList from '@/components/wl/ContestantsList.vue'
	import WLGame from '@/services/WLGame'
	import { WLDisplayMoney } from '@/services/helper'
	import WLAudio from '@/services/WLAudio'
	import WLDirector from '@/services/WLDirector'
	import WLScript from '@/services/WLScript'

	@Component({
		components: { ContestantsList }
	})
	export default class InfoBar extends Vue {

		public gameObj: WLGame = null
		public contestantNames: string
		public total: number = 0
		public round: number = 1

		public created() {
			WLDirector.set('free')
			// this.contestantNames = 'Josh Testerson=Josh,Craig Testersson=Craig'
			this.contestantNames = 'Holly Young=Holly, Paul Barratt=Paul, Sarah Bell=Sarah,Esther Akinfenwa=Esther, Vicki Kiely=Vicki, Nick Pearson=Nick, Tanya Alam=Tanya, Leo Baines Jump=Leo'
			// this.contestantNames = 'Anne, Jack, Peter, Rebekah, Guy, Lisa, James, Nick'
		}

		public get game() {
			return (this.$store.state.wl as WLState).game
		}

		public get screenState() {
			return (this.$store.state.wl as WLState).screenState
		}

		public get director() {
			return (this.$store.state.wl as WLState).director
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
			WLDirector.set('free')
		}

		public walkOfShame() {
			this.setScreenState('nothing')
			this.gameObj.walkOfShame()
			const out = this.game.contestants.filter((c) => c.out).sort((a, b) => a.outTime > b.outTime ? -1 : 1)[0]
			WLDirector.set(out.googleName)
			WLScript.set('<em>[ Vote out interview ]</em>')
			setTimeout(() => WLDirector.set('free'), 30000)
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
	</div>
</template>

<style lang="scss" scoped>
	@import '../../style/weakest-link.scss';
	
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
