<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { Contestant } from '@/types'

	@Component
	export default class Scores extends Vue {
		@Prop() public contestants: Contestant[]

		public position(contestant: Contestant) {
			const copy = [ ...this.contestants ]
			copy.sort((a, b) => a.score > b.score ? 1 : -1)
			const pos = copy.findIndex((c) => c === contestant)
			const offset = pos - 2
			return {
				[`pos_${pos}`]: true,
				top: contestant.score !== 0 && contestant.score === copy[4].score
			}
		}
	}
</script>

<template>
	<div class="scores">
		<div class="contestants">
			<div
				v-for="contestant in contestants"
				class="contestant"
				:key="contestant.name"
				:class="position(contestant)"
			>
				<img :src="contestant.icon" />
				<div class="score">{{ contestant.score }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">

	.scores {
		max-width: 90vw;
		margin: 0 auto;
	}

	$size: 250px;

	.contestants {
		margin: 50vh auto 0;
		transform: translateY(-50%);
		height: $size;
		position: relative;
	}

			
	.contestant {
		position: absolute;
		left: calc(50vw - #{$size / 2});
		max-width: $size;
		transition: all 1s ease-in-out;

		img {
			border-radius: 1rem;
			height: auto;
			width: $size;
			border: 0.5rem solid black;
			transition: all 1s ease-in-out;
		}

		.score {
			color: white;
			display: block;
			margin: 1rem auto 0;
			width: 7rem;
			height: 7rem;
			border-radius: 50%;
			font-size: 3rem;
			line-height: 7rem;
			background: url('../assets/wax.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			transition: all 1s ease-in-out;
		}

		&.pos_0 { transform: translateX(-2 * 300 - 100px) }
		&.pos_1 { transform: translateX(-1 * 300 - 100px) }
		&.pos_2 { transform: translateX(+0 * 300 - 100px) }
		&.pos_3 { transform: translateX(+1 * 300 - 100px) }
		&.pos_4 { transform: translateX(+2 * 300 - 100px) }

		&.top img {
			transform: scale(1.15) rotate(5deg);
			border-color: goldenrod;
		}

		&.top .score {
			margin-top: 3rem;
			transform: scale(1.15);
		}
	}
</style>
