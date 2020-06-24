<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessQuestion, PointlessGame, PointlessRound, PointlessBoardAnswer, PointlessAnswer } from '@/types/Pointless'
	import CircleOverlay from '@/components/pl/CircleOverlay.vue'

	@Component({
		components: { CircleOverlay }
	})
	export default class FinalAnswers extends Vue {
		@Prop() public answers: string

		public get answersSplit() {
			return this.answers.split('\n').map((a) => a.trim()).filter((a) => a.length)
		}

	}
</script>

<template>
    <CircleOverlay class="final-answers">
		<div class="slide">
			<div class="content">
				<div class="block small" v-for="(answer, i) in answersSplit" :key="i">
					{{ answer }}
				</div>
			</div>
		</div>
    </CircleOverlay>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: $width;
		height: $height;
		padding-top: s(50);
		cursor: pointer;
	}

	.content {
		transform: translateY(-50%);
	}

	.final-answers {
		width: $width;
		height: $height;
		background: radial-gradient(circle, rgb(79, 50, 223) 20%, rgb(7, 30, 180) 80%, rgb(1, 20, 148) 100%);
		text-align: center;

		.block {
			display: inline-flex;
			background: linear-gradient(20deg, rgb(70, 33, 180) 30%, rgb(50, 43, 184) 50%, rgba(32,26,171,1) 61%, rgba(41,31,179,1) 62%, rgb(86, 49, 199) 100%);
			box-shadow: inset 0 0 s(5) rgb(0, 0, 0, 0.5);
			border: s(0.5) solid #FFFFFF;
			width: s(140);
			min-height: s(40);
			border-radius: s(20);
			padding-top: s(2);
			padding-bottom: s(2);
			padding-left: s(10);
			padding-right: s(10);
			line-height: s(9);
			font-size: s(7);
			font-weight: bold;
			text-transform: uppercase;
			flex-direction: column;
			justify-content: center;

			&.small {
				padding-top: s(0.5);
				padding-bottom: s(0.5);
				min-height: s(20);
				margin: s(2);
				font-size: s(6);
				line-height: s(7);
			}
		}

	}
</style>
