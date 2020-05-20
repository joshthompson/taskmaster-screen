<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Logo from '@/components/wl/Logo.vue'
	import CurrentTotal from '@/components/wl/CurrentTotal.vue'
	import Chain from '@/components/wl/Chain.vue'
	import RoundTimer from '@/components/wl/RoundTimer.vue'
	import ContestantName from '@/components/wl/ContestantName.vue'
	import FinalRound from '@/components/wl/FinalRound.vue'
	import { WLState } from '@/types/WeakestLink'

	@Component({
		components: { Logo, CurrentTotal, Chain, RoundTimer, ContestantName, FinalRound }
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
	<div class="display-area" v-if="game">
		<div v-if="!game.round && !game.finalRound">
			<Logo         v-if="screenState === 'showLogo'" />
			<CurrentTotal v-if="screenState === 'showTotal'" />
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
	@import '../../style/weakest-link.scss';

	.display-area {
		position: relative;
		width: $width;
		height: $height;
		margin: 0;
		background: #00FF00;
		user-select: none;
	}
</style>
