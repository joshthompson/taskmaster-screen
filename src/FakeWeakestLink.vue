<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	import { getState } from './services/data'
	import Contestant from '@/components/wl/Contestant.vue'
	import Chain from '@/components/wl/Chain.vue'

	import WLGame from '@/services/WLGame'
	import Script from '@/services/WLScript'
	import Questions from '@/services/WLQuestions'
	import { WLState, WLChain, WLContestant } from '@/types/WeakestLink'
	import { WLDisplayMoney } from '@/services/helper'

	@Component({
		components: { Contestant, Chain }
	})
	export default class FakeWeakestLink extends Vue {

		public gameObj: WLGame = null
		public chain: number[] = WLChain
		public contestantNames: string =
			'Josh, Holly, Craig, Paul, Esther, Vicki, Nick, Tanya, Adam'
			// 'Anne, Jack, Pete, Rebekah, Guy, Lisa, James, Nick'

		public created() {
			window.addEventListener('keypress', (event) => {
				if (this.game && !this.game.round && event.code === 'Space') this.gameObj.startRound()
			})
		}

		public setupGame() {
			// Create contestants
			const contestants = this.contestantNames.split(',').map((n): WLContestant => ({ name: n.trim(), out: false }))
			contestants.sort((a, b) => a.name > b.name ? 1 : -1)
			// Create game
			this.gameObj = new WLGame(contestants)
		}

		public money(value) {
			return WLDisplayMoney(value)
		}

		private getQuestion() {
			// TODO - COMPONENT
			// const question = Questions.getQuestion(this.round)
			// this.script = `
			// 	<div>${this.currentContestant.name}, ${question.q}</div>
			// 	<div class="answer">${question.a}</div>
			// `
		}

		public get game() {
			return (this.$store.state.wl as WLState).game
		}

		public get script() {
			return (this.$store.state.wl as WLState).script
		}

		public get time() {
			// TODO - COMPONENT
			const mins = Math.floor(this.game.round.timer / 60)
			const secs = Math.floor(this.game.round.timer % 60)
			return `${mins}:${secs < 10 ? `0${secs}` : secs}`
		}

		public get contenstantOut() {
			return this.game.contestants.filter((c) => c.out)
		}

		public get currentContestant() {
			return this.game.round.currentContestant
		}

		public contestantOut(contestant: WLContestant, out: boolean) {
			this.gameObj.vote(contestant.name, out)
		}

	}
</script>

<template>
	<div id="fake-weakest-link">

		<div id="film-area">
			<div class="logo" v-if="game && !game.round"></div>
			<div v-if="game && game.round">
				<Chain :game="game" />
				<div class="contestant" v-if="game.round.started">
					{{ game.round.currentContestant.name }}
				</div>
				<div class="timer">{{ time }}</div>
				{{ game.data }}
			</div>
		</div>

		<div id="info-bar">
			<h2>
				<span>Weakest Link</span>
				<span v-if="game && game.roundNumber > 0">: Round {{ game.roundNumber }}</span>
			</h2>

			<div v-if="!game">
				<textarea type="text" v-model="contestantNames"></textarea>
				<!-- <p>Banked: <input type="text" v-model="total" /></p> -->
				<!-- <p>Round: <input type="text" v-model="round" /></p> -->
				<p><button @click="setupGame" class="btn">Setup Game</button></p>
			</div>

			<div v-if="game">
				<h3>Total</h3>
				<div>{{ money(game.totalBanked) }}</div>
			</div>
			<div v-if="game">
				<h3>Strongest Link</h3>
				<Contestant
					v-for="contestant in game.strongest"
					:key="contestant.name"
					:name="contestant.name"
					@out="contestantOut(contestant, $event)"
				/>
			</div>
			<div v-if="game">
				<Contestant
					v-for="contestant in contenstantOut"
					:key="contestant.name"
					:contestant="contestant"
					@out="contestantOut(contestant, $event)"
				/>
			</div>
		</div>

		<div id="bottom-bar" v-html="script"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import './style/weakest-link.scss';

	#fake-weakest-link {
		height: 100vh;
		width: 100vw;
		position: relative;
	}

	#film-area {
		position: relative;
		width: $width;
		height: $height;
		margin: 0;
		background: #00FF00;
	}

	#info-bar {
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

	#bottom-bar {
		$textSize: calc((100vh - #{$height}) / 5);
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: calc(100vh - #{$height});
		background: #000000;
		color: #FFFFFF;
		padding: 1rem;
		text-align: center;
		line-height: $textSize;
		font-size: $textSize;
		overflow: auto;
	}

	.logo {
		position: absolute;
		bottom: $s5;
		right: $s5;
		background-image: url('assets/weakest-link/logo.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: $s15;
		height: $s15;
	}

	.timer {
		position: absolute;
		bottom: $s5;
		right: $s5;
		background-image: url('assets/weakest-link/Clock.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: $s25;
		height: $s15;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: $s5;
		line-height: $s15;
	}

	.contestant {
		position: absolute;
		text-transform: uppercase;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: $s70;
		color: white;
		height: $s30;
		line-height: $s30;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: $s10;
		border-radius: 50%;
		background-image: url('assets/weakest-link/name.png');
		background-size: 100% 100%;
		background-position: center bottom;
		background-repeat: no-repeat;

	}
</style>

<style lang="scss">
	#bottom-bar .answer {
		margin-top: 0.5rem;
		color: #008DD4;
	}
</style>