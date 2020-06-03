<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Logo from '@/components/wl/Logo.vue'
	import CurrentTotal from '@/components/wl/CurrentTotal.vue'
	import Chain from '@/components/wl/Chain.vue'
	import RoundTimer from '@/components/wl/RoundTimer.vue'
	import ContestantName from '@/components/wl/ContestantName.vue'
	import FinalRound from '@/components/wl/FinalRound.vue'
	import Intro from '@/components/wl/Intro.vue'
	import Credits from '@/components/wl/Credits.vue'
	import { WLState } from '@/types/WeakestLink'

	@Component({
		components: { Logo, CurrentTotal, Chain, RoundTimer, ContestantName, FinalRound, Intro, Credits }
	})
	export default class DisplayArea extends Vue {
		public get game() {
			return (this.$store.state.wl as WLState).game
		}
		public get screenState() {
			return (this.$store.state.wl as WLState).screenState
		}
	}
</script>

<template>
	<div class="display-area" v-if="game" :data-screen-state="screenState">
		<Intro :game="game" v-if="screenState === 'intro'" />
		<Credits :game="game" v-if="screenState === 'credits'" />
		<div v-if="screenState === 'preShow'" class="pre-show">
			The episode will start soon
		</div>
		<div v-if="!game.round && !game.finalRound">
			<Logo v-if="screenState === 'showLogo'" />
			<CurrentTotal v-if="screenState === 'showTotal'" />
		</div>
		<div v-if="game.namePlaque">
			<ContestantName :name="game.namePlaque" />
		</div>
		<div v-if="game.round">
			<Chain :game="game" />
			<ContestantName v-if="game.round.started" :name="game.round.currentContestant.name" />
			<RoundTimer :time="game.round.timer" />
		</div>
		<FinalRound v-if="game.finalRound && game.finalRound.started" />
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/sizing.scss';

	.display-area {
		position: relative;
		width: $width;
		height: $height;
		margin: 0;
		background-color: #00FF00;
		user-select: none;
		overflow: hidden;

		&[data-screen-state="preShow"] {
			background: white;
			.pre-show {
				padding-top: $s45;
				color: black;
				font-size: $s10;
			}
		}

		&[data-screen-state="intro"] {
			animation: backgroundFade 29s linear;
			background-image: url('/weakest-link/transparent.png');
			background-size: 100% 100%;
		}

		&[data-screen-state="credits"] {
			animation: backgroundFadeRepeat 10s linear infinite;
			background-color: black;
			background-image: url('/weakest-link/bg-colour1.png');
			background-size: 100% 100%;
		}

		@keyframes backgroundFade {
			40%  { background-image: url('/weakest-link/transparent.png'); }
			55%  { background-image: url('/weakest-link/bg-colour1.png');  }
			70%  { background-image: url('/weakest-link/bg-colour2.png');  }
			85%  { background-image: url('/weakest-link/bg-colour1.png');  }
			95%  { background-image: url('/weakest-link/bg-colour2.png');  }
			100% { background-image: url('/weakest-link/transparent.png'); }
		}

		@keyframes backgroundFadeRepeat {
			0%   { background-image: url('/weakest-link/bg-colour1.png'); }
			50%  { background-image: url('/weakest-link/bg-colour2.png'); }
			100% { background-image: url('/weakest-link/bg-colour1.png'); }
		}
	}
</style>
