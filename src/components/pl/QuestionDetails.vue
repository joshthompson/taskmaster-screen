<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessQuestion, PointlessAnswer, PointlessWrongAnswer, PointlessGame } from '@/types/Pointless'
	import AnswerBlock from '@/components/pl/AnswerBlock.vue'

	@Component({
		components: { AnswerBlock }
	})
	export default class QuestionDetails extends Vue {
		@Prop() public game: PointlessGame
		@Prop() public answer: PointlessAnswer
		public wrongAnswer: PointlessAnswer = PointlessWrongAnswer

		public setAnswer(answer: PointlessAnswer) {
			this.$emit('setAnswer', answer)
		}

		public get question() {
			return this.game.rounds[this.game.currentRound].questions[this.game.currentQuestion]
		}

		public get answers() {
			if (this.question.openAnswers) {
				return [ this.question.openAnswers ]
			} else if (this.question.boards) {
				return [ this.question.boards[this.game.currentPass - 1] ]
			} else if (this.question.groupedAnswers) {
				return this.question.groupedAnswers
			} else {
				return []
			}
		}

		public get questions() {
			return typeof this.question.question === 'string' ? [ this.question.question ] : this.question.question
		}
	}
</script>

<template>
    <div class="question-details">
		<div class="details">
			<div>
				<label>Category:</label>
				<span>{{ question.category }}</span>
			</div>
			<div>
				<label>Question:</label>
				<ul>
					<li v-for="(question, i) in questions" :key="i" v-html="question"></li>
				</ul>
			</div>
			<div>
				<label>Detail:</label>
				<span v-html="question.detail"></span>
			</div>
			<div>
				<label>Answer:</label>
				<span v-html="answer.answer"></span>
			</div>
			<div>
				<label>Extra:</label>
				<span v-html="answer.extra"></span>
			</div>
		</div>
		<div>
			<AnswerBlock :answer="null" size="small" @selected="setAnswer" :selected="answer === wrongAnswer" />
		</div>
		<div v-for="(group, i) in answers" :key="i">
			<hr />
			<div v-if="answers.length > 1" class="group-title" v-html="question.question[i]"></div>
			<div v-for="a in group" :key="a.answer">
				<AnswerBlock :answer="a" size="small" @selected="setAnswer" :selected="answer === a" />
			</div>
		</div>
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.question-details {
		margin-top: 1em;
	}

	.group-title {
		text-align: center;
	}

    label {
		font-weight: bold;
	}

	.details {
		display: table;
		& > * {
			display: table-row;
			& > * {
				display: table-cell;
				&:nth-child(1) {
					padding-right: 0.5em;
				}
				&:nth-child(2) {
					padding-bottom: 0.5em;
				}
			}
		}
	}

	ul {
		padding-left: 1rem;
	}

</style>
