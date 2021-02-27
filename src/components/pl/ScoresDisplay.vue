<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessGame } from '@/types/Pointless'
	import CircleOverlay from '@/components/pl/CircleOverlay.vue'
	import TeamScore from '@/components/pl/TeamScore.vue'

	@Component({
		components: { CircleOverlay, TeamScore }
	})
	export default class ScoresDisplay extends Vue {
		@Prop() public game: PointlessGame

		public get question() {
			return this.game.rounds[this.game.currentRound].questions[this.game.currentQuestion]
		}

		public get teams() {
			return this.game.teams.filter((t) => !t.out)
		}
	}
</script>

<template>
    <CircleOverlay class="scores-display">
		<div class="scores">
			<div class="score" v-for="team in teams" :key="team.name">
				<div class="inner">
					<TeamScore :team="team" :max="question.max" :game="game" />
				</div>
			</div>
		</div>
    </CircleOverlay>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.scores-display {
		width: $width;
		height: $height;
		background: radial-gradient(
			circle,
			rgb(108, 89, 199) 20%,
			rgb(107, 40, 174) 80%,
			rgb(92, 31, 215) 100%
		);
		text-align: center;

		.scores {
			margin-top: s(55);
			transform: translateY(-50%);
		}

		.score {
			display: inline-block;
			width: 50%;
			height: s(50);
			line-height: s(10);
			font-size: s(5);
			.inner {
				margin-top: s(20);
				transform: translateY(-50%) scale(1.2);
			}
		}
	}
</style>
