<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { WLDisplayMoney } from '@/services/helper'
	import { WLState } from '@/types/WeakestLink'

	@Component
	export default class CurrentTotal extends Vue {
		private get game() {
			return (this.$store.state.wl as WLState).game
		}

		public get total() {
			return WLDisplayMoney(this.game.totalBanked, true, '')
		}
	}
</script>

<template>
	<div class="current-total">
		<div class="value" v-html="total"></div>
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/sizing.scss';

	.current-total {
		position: absolute;
		bottom: $s2_5;
		left: 50%;
		transform: translateX(-50%);
		background-image: url('../../assets/weakest-link/Total.png');
		background-size: contain;
		background-position: center bottom;
		background-repeat: no-repeat;
		font-size: $s4;
		font-weight: bold;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		width: $s80;
		height: $s20;
		padding: $s10 $s20;
		text-transform: uppercase;
		// line-height: $s5;

		.value {
			transform: translateY(-50%);
		}
	}
</style>
