<script lang="ts">
	import { Contestant } from '@/FakeWheelOfFortune.vue'
	import { Component, Prop, Vue } from 'vue-property-decorator'


	@Component
	export default class WOFContestants extends Vue {

		@Prop({ default: [] }) public contestants: Contestant[]
		@Prop({ default: 0}) public current: number
		
		public padScore(contestant: Contestant) {
			return contestant.score.toString().padStart(5, '0')
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
					<div v-for="(number, i) in padScore(contestant)" :key="`score-${i}`">
						{{ number }}
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
				color: yellow;
				text-shadow: 0 0 s(2) yellow;
				font-family: 'Seven Segment';
				font-size: s(5);
				font-weight: normal;
				div {
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


