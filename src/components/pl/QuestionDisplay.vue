<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessQuestion, PointlessGame, PointlessRound, PointlessBoard, PointlessAnswer } from '@/types/Pointless'
	import CircleOverlay from '@/components/pl/CircleOverlay.vue'
	import AnswerBlock from '@/components/pl/AnswerBlock.vue'

	type QuestionDetailsState = 'categories' | 'category' | 'question' | 'board'
	
	@Component({
		components: { CircleOverlay, AnswerBlock }
	})
	export default class QuestionDisplay extends Vue {
		@Prop() public game: PointlessGame
		@Prop() public answer: PointlessAnswer

		public get round(): PointlessRound {
			return this.game.rounds[this.game.currentRound]
		}

		public get question(): PointlessQuestion {
			return this.round.questions[this.game.currentQuestion]
		}

		public get categories(): string[] {
			return this.round.questions.map((q) => q.category)
		}

		public get board(): PointlessBoard {
			return this.question.boards ? this.question.boards[this.game.currentPass - 1] : null
		}

		public mode: QuestionDetailsState = 'category'

		public mounted() {
			if (this.game.currentRound === 3) {
				this.mode = 'categories'
			}
		}

		public next() {
			switch (this.mode) {
				case 'categories':
					this.mode = 'category'
					break
				case 'category':
					this.mode = 'question'
					break
				case 'question':
					this.mode = this.board ? 'board' : 'category'
					break
				case 'board':
					this.mode = this.game.currentRound === 3 ? 'categories' : 'category'
					break
			}
		}

		public setAnswer(answer: PointlessAnswer) {
			this.$emit('setAnswer', answer)
		}

		public showAnswer(answer: PointlessAnswer) {
			return this.game.guessedAnswers.find((a) => a === answer)
		}

		public get questions() {
			return typeof this.question.question === 'string' ? [ this.question.question ] : this.question.question
		}

		public selectCategory(category: string) {
			this.game.currentQuestion = this.round.questions.findIndex((q) => q.category === category)
			this.next()
			this.next()
		}
	}
</script>

<template>
    <CircleOverlay class="question-display">
		<transition name="slide">
			<div class="slide" v-if="mode === 'categories'" key="category">
				<div class="content">
					<div class="block small" v-for="category in categories" :key="category" @click="selectCategory(category)">
						{{ category }}
					</div>
				</div>
			</div>
			<div class="slide" v-if="mode === 'category'" key="category" @click="next">
				<div class="content">
					<div class="block">{{ question.category }}</div>
				</div>
			</div>
			<div class="slide" v-if="mode === 'question'" key="question" @click="next">
				<div class="content">
					<div
						class="block"
						v-for="(question, i) in questions"
						:key="i"
						:class="questions.length > 1 ? 'small' : ''"
						v-html="question"
					></div>
				</div>
			</div>
			<div class="slide" v-if="mode === 'board'" key="board" @click="next">
				<div class="content">
					<div v-for="a in board" :key="a.answer" class="answer" @click="$event.stopPropagation()">
						<AnswerBlock
							:answer="a"
							size="large"
							:showHint="true"
							:hideAnswer="!showAnswer(a)"
							:selected="a === answer"
							@selected="setAnswer"
						/>
					</div>
				</div>
			</div>
		</transition>
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

	.question-display {
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

		.answer {
			padding-top: s(1);
			padding-bottom: s(1);
		}

		.content {
			transform: translateY(-50%);
			padding: s(5);
		}
	}

	.slide-enter-active {
		transition: all 0.5s ease-in-out;
	}
	.slide-leave-active {
		transition: all 0.5s ease-in-out;
	}
	.slide-enter {
		transform: rotate3d(0, 1, 0, 90deg) translateX(100%) scaleX(0);
		opacity: 0;
	}
	.slide-leave-to {
		transform: rotate3d(0, 1, 0, -90deg) translateX(-100%) scaleX(0);
		opacity: 0;
	}


</style>
