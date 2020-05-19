<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Logo from '@/components/wl/Logo.vue'
	import Chain from '@/components/wl/Chain.vue'
	import RoundTimer from '@/components/wl/RoundTimer.vue'
	import ContestantName from '@/components/wl/ContestantName.vue'
	import { WLState } from '@/types/WeakestLink'

	@Component({
		components: { Logo, Chain, RoundTimer, ContestantName }
	})
	export default class DisplayArea extends Vue {
		public get game() {
			return (this.$store.state.wl as WLState).game
		}
	}
</script>

<template>
	<div class="display-area">
		<Logo v-if="game && !game.round" />
		<div v-if="game && game.round">
			<Chain :game="game" />
			<ContestantName v-if="game.round.started" :name="game.round.currentContestant.name" />
			<RoundTimer :time="game.round.timer" />
		</div>
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
	}
</style>
