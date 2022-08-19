<script lang="ts">
	import { Contestant } from '@/FakeWheelOfFortune.vue'
	import { Component, Prop, Vue } from 'vue-property-decorator'


	@Component
	export default class WOFContestants extends Vue {

		@Prop({ default: [] }) public contestants: Contestant[]
		@Prop({ default: 0}) public current: number
		@Prop({ default: false }) public showTotals: boolean
		
		public displayValue(contestant: Contestant) {
			return (this.showTotals ? contestant.total : contestant.score).toString()
		}
		
		public padScore(contestant: Contestant) {
			if (this.displayValue(contestant) === '0') {
				return '     '
			}
			return this.displayValue(contestant).padStart(5, ' ')
		}
	}
</script>

<template>
	<div class="contestants">
		<div
			v-for="(contestant, n) in contestants"
			:key="`contestant-${n}`"
			:data-n="n % 3"
			:class="{ current: n === current }"
			class="contestant"
		>
			<div class="details" >
				<div>{{ contestant.name }}</div>
				<div class="score">
					<div class="score-background">
						<div v-for="(_number, i) in padScore(contestant)" :key="`score-${i}`" class="character">
							8
						</div>
					</div>
					<div class="score-foreground">
						<div v-for="(number, i) in padScore(contestant)" :key="`score-${i}`" class="character">
							{{ number }}
						</div>
					</div>
				</div>
			</div>
			<div class="after"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	@font-face {
		font-family: 'Seven Segment';
		src: url('/wheel-of-fortune/fonts/seven-segment.ttf');
	}

	.contestants {
		display: flex;
		justify-content: space-around;
		margin-top: s(3);

		.contestant {
			&[data-n="0"] { --player-colour: #CC0000; }
			&[data-n="1"] { --player-colour: #EEEE00; }
			&[data-n="2"] { --player-colour: #5555EE; }
		}
		
		.details {
			width: s(32);
			text-transform: uppercase;
			color: black;
			font-weight: bold;
			font-size: s(3);
			.score {
				background: #333333;
				padding: s(2);
				margin-top: s(1);
				font-family: 'Seven Segment';
				font-size: s(5);
				font-weight: normal;
				height: s(10);

				.score-background {
					position: absolute;

					color: #1c1c1a;
					text-shadow: 0 0 s(5) #1c1c1a;
				}

				.score-foreground {
					position: absolute;
					color: yellow;
					text-shadow: 0 0 s(2) yellow;
					.character {
						background: none;
					}
				}

				.character {
					display: inline-block;
					background: #000;
					padding: s(0.25) s(1);
					width: 1em;
					text-align: right;
					margin: 0 s(0.25);
				}
			}

		}
		.after {
			border-top: s(4) solid var(--player-colour);
			border-left: s(16) solid transparent;
			border-right: s(16) solid transparent;
			height: s(2);
			
			@keyframes flash-white {
				0%, 49.9% { filter: brightness(1) };
				50%, 100% { filter: brightness(2.5) };
			}
		}
		.contestant.current {
			.details {
				color: white;
			}
			.after {
				animation: flash-white 1s linear infinite;
			}
		}
	}
</style>


