<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import WLGame from '@/services/WLGame'
	import { WLChain } from '@/types/WeakestLink'
	import { WLDisplayMoney } from '@/services/helper'

	@Component
	export default class Chain extends Vue {
		@Prop() public game: WLGame
		public chain: number[] = WLChain

		public get position() {
			return this.game.round.chainPosition
		}

		public money(value) {
			return WLDisplayMoney(value)
		}

		public styles(i) {
			const styles: CSSStyleDeclaration | any = {}
			if (i >= 1) {
				if (i < this.position) {
					styles.marginBottom = `-3vh`
				}
				if (i === this.position - 1 || i === this.position - 0.5) {
					styles.marginTop = `${(i) * 3 + 1}vh`
				}
			}
			return styles
		}

		public classes(i) {
			return {
				done: i < this.position,
				current: i === this.position || i === this.position - 0.5,
				top: i === this.chain.length - 1
			}
		}
	}
</script>

<template>
	<div class="chain" v-if="game.round">
		<div class="bank">
			{{ money(game.round.banked) }}
		</div>
		<div v-for="(val, i) in chain" :key="i" :class="classes(i)" :style="styles(i)">
			{{ money(val) }}
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/weakest-link.scss';

	.chain {
		position: absolute;
		display: flex;
		flex-direction: column-reverse;
		height: $s90;
		bottom: $s5;
		left: $s5;
		& > div {
			flex-grow: 1;
			line-height: $s5;
			font-weight: bold;
			text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
			font-size: $s2_5;
			width: $s20;
			margin-top: $s1;
			transition: margin 0.1s linear;

			background-image: url('../../assets/weakest-link/Next.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;

			&.current {
				background-image: url('../../assets/weakest-link/Current.png');
			}

			&.bank {
				height: $s10;
				line-height: $s7_5;
				font-size: $s3_5;
				background-image: url('../../assets/weakest-link/Bank.png');
				z-index: 1;
			}
			&.top {
				height: $s10;
				line-height: $s10;
				font-size: $s4;
			}
		}
	}
</style>
