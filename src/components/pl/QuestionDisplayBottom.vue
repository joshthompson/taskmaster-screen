<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessQuestion, PointlessGame, PointlessRound, PointlessBoardAnswer, PointlessAnswer } from '@/types/Pointless'
	import AnswerBlock from '@/components/pl/AnswerBlock.vue'
	import Slides from '@/components/pl/Slides.vue'
	
	@Component({
		components: { AnswerBlock, Slides }
	})
	export default class QuestionDisplayBottom extends Vue {
		@Prop() public game: PointlessGame

		public get round(): PointlessRound {
			return this.game.rounds[this.game.currentRound]
		}

		public get question(): PointlessQuestion {
			return this.round.questions[this.game.currentQuestion]
		}

		public get blocks() {
			if (this.question.boards) {
				return (this.question.boards[this.game.currentPass - 1] || []).map((answer) => (
					answer.image ? '' : answer.hint
				))
			}
			return typeof this.question.question === 'string' ? [ this.question.question ] : this.question.question
		}

	}
</script>

<template>
    <div class="question-display-bottom">
		<div class="content">
			<div
				:class="{
					block: true,
					small: blocks.length > 1,
					smaller: game.currentRound === 3,
					images: question.boards && question.boards[0][0].image
				}"
				:style="{
					[ (question.boards && question.boards[0][0].image) ? 'backgroundImage' : '']
					: (question.boards && question.boards[0][0].image) ? `url(${question.boards[0][i].image})` : ''
				}"
				v-for="(block, i) in blocks"
				:key="'question-display-bottom-block' + i"
				v-html="block"
			></div>
		</div>
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.question-display-bottom {
		position: absolute;
		bottom: s(2);
		width: $width;

		.block {
			display: inline-block;
			background: linear-gradient(20deg, rgb(70, 33, 180) 30%, rgb(50, 43, 184) 50%, rgba(32,26,171,1) 61%, rgba(41,31,179,1) 62%, rgb(86, 49, 199) 100%);
			box-shadow: inset 0 0 s(5) rgb(0, 0, 0, 0.5);
			border: s(0.5) solid #FFFFFF;
			width: s(70);
			border-radius: s(10);
			padding-top: s(1);
			padding-bottom: s(1);
			padding-left: s(5);
			padding-right: s(5);
			line-height: s(4.5);
			font-size: s(3.5);
			font-weight: bold;
			text-transform: uppercase;
			flex-direction: row;
			justify-content: center;
			overflow: hidden;

			sub {
				display: inline;
			}

			.lc {
				text-transform: lowercase;
			}

			&.small:not(.images) {
				padding-top: s(0);
				padding-bottom: s(0);
				min-height: s(6);
				margin: s(0.25) s(0.75);
				width: s(70);
				font-size: s(3);
				line-height: s(6);
			}

			&.smaller {
				font-size: s(2.7);
				line-height: s(3);
				padding-top: s(1);
				padding-bottom: s(1);
			}
		}
	}
</style>

<style lang="scss">
	@import '@/style/sizing.scss';

	.question-display-bottom .block.images {

		padding: 0;
		width: s(25);
		height: s(15);
		margin: s(0.25) s(1);
		background-size: 100% 100%;
		border-radius: s(2.5);
	}

	.lc {
		text-transform: lowercase;
	}
</style>