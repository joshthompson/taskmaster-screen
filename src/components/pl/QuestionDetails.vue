<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessQuestion, PointlessAnswer, PointlessWrongAnswer } from '@/types/Pointless'
	import AnswerBlock from '@/components/pl/AnswerBlock.vue'

	@Component({
		components: { AnswerBlock }
	})
	export default class QuestionDetails extends Vue {
		@Prop() public question: PointlessQuestion
		@Prop() public answer: PointlessAnswer
		public wrongAnswer: PointlessAnswer = PointlessWrongAnswer

		public setAnswer(answer: PointlessAnswer) {
			this.$emit('setAnswer', answer)
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
				<span>{{ question.question }}</span>
			</div>
			<div>
				<label>Detail:</label>
				<span>{{ question.detail }}</span>
			</div>
		</div>
		<div>
			<AnswerBlock :answer="null" size="small" @selected="setAnswer" :selected="answer === wrongAnswer" />
		</div>
		<div v-for="a in question.openAnswers" :key="a.answer">
			<AnswerBlock :answer="a" size="small" @selected="setAnswer" :selected="answer === a" />
		</div>
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.question-details {
		margin-top: 1em;
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


</style>
