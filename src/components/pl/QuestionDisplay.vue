<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessQuestion, PointlessGame, PointlessRound, PointlessBoardAnswer, PointlessAnswer } from '@/types/Pointless'
	import CircleOverlay from '@/components/pl/CircleOverlay.vue'
	import AnswerBlock from '@/components/pl/AnswerBlock.vue'

	type QuestionDetailsState = 'categories' | 'category' | 'question' | 'board' | 'pointless' | 'top'
	
	@Component({
		components: { CircleOverlay, AnswerBlock }
	})
	export default class QuestionDisplay extends Vue {
		@Prop() public game: PointlessGame
		@Prop() public answer: PointlessAnswer
		
		public group: number = 0
		public page: number = 0
		public perPage: number = 6
		public top: number = 0

		public get round(): PointlessRound {
			return this.game.rounds[this.game.currentRound]
		}

		public get question(): PointlessQuestion {
			return this.round.questions[this.game.currentQuestion]
		}

		public get categories(): string[] {
			return this.round.questions.map((q) => q.category)
		}

		public get board(): PointlessBoardAnswer[] {
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
					this.group = 0
					this.page = 0
					this.mode = this.board ? 'board' : 'pointless'
					break
				case 'pointless':
					const pages = Math.floor(this.pointlessAnswers.length / this.perPage)
					if (this.page < pages) {
						this.page++
					} else if (this.group < this.groups - 1) {
						this.group++
					} else {
						this.top = 1
						this.group = 0
						this.mode = 'top'
					}
					break
				case 'top':
					if (this.top < this.topAnswers.length) {
						this.top++
					} else if (this.group < this.groups - 1) {
						this.group++
						this.top = 1
					} else {
						this.mode = this.game.currentRound === 3 ? 'categories' : 'category'
					}
					break
				case 'board':
					this.mode = this.game.currentRound === 3 ? 'categories' : 'category'
					break
			}

			while (this.mode === 'pointless' && this.pointlessAnswers.length === 0) {
				if (this.group < this.groups - 1) {
					this.group++
				} else {
					this.top = 1
					this.group = 0
					this.mode = 'top'
				}
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

		public get imageBoard() {
			return this.question.boards && this.question.boards[0][0].image ? true : false
		}

		public selectCategory(category: string) {
			this.game.currentQuestion = this.round.questions.findIndex((q) => q.category === category)
			this.next()
			this.next()
		}

		private get revealableAnswers() {
			return this.question.groupedAnswers
				? this.question.groupedAnswers[this.group]
				: this.question.openAnswers
		}

		public get pointlessAnswers() {
			return this.revealableAnswers.filter((a) => a.score === 0)
		}

		public get topAnswers() {
			return this.revealableAnswers
				.filter((a) => a.score > 0)
				.sort((a, b) => a.score > b.score ? -1 : 1)
				.splice(0, this.perPage)
		}

		public get groupName() {
			return typeof this.question.question === 'object'
				? this.question.question[this.group]
				: this.question.question
		}

		public get groups() {
			return typeof this.question.question === 'object'
				? this.question.question.length
				: 1
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
					<div
						v-for="a in board"
						:key="a.answer"
						class="answer"
						:class="{ imageBoard }"
						@click="$event.stopPropagation()"
					>
						<AnswerBlock
							:answer="a"
							size="large"
							:showHint="true"
							:hideAnswer="!showAnswer(a)"
							:showImage="true"
							:selected="a === answer"
							@selected="setAnswer"
						/>
					</div>
				</div>
			</div>
			<div class="slide" v-if="mode === 'pointless'" :key="`pointless_${group}_${page}`" @click="next">
				<div class="content">
					<div v-if="groupName" class="block small" v-html="groupName"></div>
					<div v-for="i in 6" :key="i">
						<AnswerBlock
							v-if="pointlessAnswers[i - 1 + page * perPage]"
							:answer="pointlessAnswers[i - 1 + page * perPage]"
							size="large"
						/>
					</div>
				</div>
			</div>
			<div class="slide" v-if="mode === 'top'" :key="`top_${group}`" @click="next">
				<div class="content">
					<div v-if="groupName" class="block small" v-html="groupName"></div>
					<div v-for="(answer, i) in topAnswers" :key="i" class="top-answer" :style="{ opacity: topAnswers.length - i >= top + 1 ? 0 : 1 }">
						<AnswerBlock
							v-if="answer"
							:answer="answer"
							size="large"
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

	.top-answer {
		transition: opacity 0.4s ease-out;
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
			padding: s(1);

			&.imageBoard {
				display: inline-block;
			}
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
