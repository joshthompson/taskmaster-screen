<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { WLState, WLContestant, WLScreenState } from '@/types/WeakestLink'
	import ContestantsList from '@/components/wl/ContestantsList.vue'
	import WLGame from '@/services/WLGame'
	import { WLDisplayMoney } from '@/services/helper'

	@Component({
		components: { ContestantsList }
	})
	export default class InfoBar extends Vue {

		public gameObj: WLGame = null
		public contestantNames: string =
			'Josh, Holly, Craig, Paul, Esther, Vicki, Nick, Tanya, Adam'
			// 'Anne, Jack, Pete, Rebekah, Guy, Lisa, James, Nick'
		public total: number = 0
		public round: number = 0

		public get game() {
			return (this.$store.state.wl as WLState).game
		}

		public get screenState() {
			return (this.$store.state.wl as WLState).screenState
		}

		public money(value) {
			return WLDisplayMoney(value)
		}

		public setupGame() {
			// Create contestants
			const contestants = this.contestantNames
				.split(',')
				.map((n): WLContestant => ({ name: n.trim(), out: false }))
				.sort((a, b) => a.name > b.name ? 1 : -1)
			// Create game
			this.gameObj = new WLGame(contestants, this.round, this.total)
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

		public setScreenState(state: WLScreenState) {
			this.$store.commit('wlSetScreenState', state)
		}

		public get showActions() {
			return this.game
				&& !this.game.round
				&& this.screenState !== 'voting'
		}

	}
</script>

<template>
	<div class="info-bar">
		<h2>
			<span>Weakest Link</span>
			<span v-if="game && game.roundNumber > 0">: Round {{ game.roundNumber }}</span>
		</h2>

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
			<button @click="setScreenState('showTotal')" class="btn large">Show Total</button>
			<button @click="setScreenState('nothing')" class="btn large">Nothing</button>
			<button @click="setScreenState('showLogo')" class="btn large">Show Logo</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '../../style/weakest-link.scss';
	
	.info-bar {
		position: absolute;
		top: 0;
		right: 0;
		width: calc(100vw - #{$width});
		height: $height;
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
