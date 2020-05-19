<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { WLState } from '@/types/WeakestLink'

	@Component
	export default class FinalRound extends Vue {
		public get finalRound() {
			return (this.$store.state.wl as WLState).game.finalRound
		}

		public value(i, j) {
			const value = this.finalRound.results[i][j]
			if (value === true) return '✓'
			else if (value === false) return '✘'
			else if (value === null) return i
		}

		public classes(i, j) {
			return {
				correct: this.finalRound.results[i][j] === true,
				future: i * 2 + j > this.finalRound.questionNumber
			}
		}
	}
</script>

<template>
	<div class="final-round">
		<div class="names">
			<div>{{ finalRound.player1.name }}</div>
			<div>{{ finalRound.player2.name }}</div>
		</div>
		<div class="question" v-for="i in 5" :key="i">
			<div :class="classes(i - 1, 0)">{{ value(i - 1, 0) }}</div>
			<div :class="classes(i - 1, 1)">{{ value(i - 1, 1) }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/weakest-link.scss';

	.final-round {
		position: absolute;
		bottom: $s2_5;
		left: 50%;
		transform: translateX(-50%);

		width: $s120;
		height: $s15;

		font-size: $s4;
		font-weight: bold;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

		display: flex;

		.names, .question {
			flex-grow: 1;
			& > div {
				height: $s7_5;
				line-height: $s7_5;
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
			}
		}

		.names {
			width: $s20;
			& > div {
				background-image: url('../../assets/weakest-link/FinalNameStrap.png');
			}
		}

		.question {
			width: $s10;
			& > div {
				width: 100%;
				flex-grow: 1;
				background-image: url('../../assets/weakest-link/FinalNextQ.png');
				&.correct {
					background-image: url('../../assets/weakest-link/FinalCorrect.png');
				}
				&.future {
					color: #CCCCCC;
				}
			}
		}
	}
</style>
