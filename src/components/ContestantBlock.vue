<script lang="ts">
	import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
	import { Contestant } from '@/types'

	@Component
	export default class ContestantBlock extends Vue {
		@Prop() public contestant: Contestant
		private score: number = 0

		public created() {
			this.score = this.contestant.score
		}

		@Watch('contestant.score', { immediate: true })
		public watchScore() {
			this.updateScore()
		}

		public updateScore() {
			if (this.score < this.contestant.score) {
				this.score++
				setTimeout(this.updateScore, 200)
			} else {
				this.score = this.contestant.score
			}
		}

	}
</script>

<template>
	<div class="contestant">
		<img :src="contestant.icon" />
		<div class="score">{{ score }}</div>
	</div>
</template>

<style scoped lang="scss">
	
	$size: 250px;

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
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
