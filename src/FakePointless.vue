<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import Scoreometer from '@/components/pl/Scoreometer.vue'
	import AnswerBlock from '@/components/pl/AnswerBlock.vue'
	import { PointlessAnswer, PointlessQuestion, PointlessTeam, PointlessGame, PLState } from '@/types/Pointless'
	import { game } from '@/services/pl/data'

	@Component({
		components: { DisplayArea, ControlBar, ScriptBar, Scoreometer, AnswerBlock }
	})
	export default class FakePointless extends Vue {

		public get director() { return (this.$store.state.pl as PLState).director }
		public set director(director: string) { this.$store.commit('plSetDirector', director) }

		public game: PointlessGame = game

		public wrongAnswer: PointlessAnswer = {
			answer: '✘',
			score: 100
		}

		public answer1: PointlessAnswer = {
			answer: 'Chicago',
			score: 6,
			extra: 'Nice city'
		}

		public answer2: PointlessAnswer = {
			answer: 'New York',
			score: 14,
			extra: 'Big place'
		}

		public get round() {
			return this.game.rounds[this.game.currentRound]
		}

		public get question() {
			return this.round.questions[this.game.currentQuestion]
		}

		public get double() {
			return this.game.currentRound === 2
		}

		public setAnswer(answer: PointlessAnswer) {
			this.answer1 = answer || this.wrongAnswer
		}

	}
</script>

<template>
	<div id="fake-pointless">
		<DisplayArea :screenCapture="false">
			<Scoreometer
				:question="question"
				:answer="answer1"
				:type="double ? 'left' : 'standard'"
				:key="question.question + 1 + answer1.answer"
			/>
			<Scoreometer
				:question="question"
				:answer="answer2"
				v-if="double" type="right"
				:key="question.question + 2 + answer2.answer"
			/>
		</DisplayArea>
		<ControlBar>
			<h3>Pointless</h3>

			<div>
				<label>Director: </label>
				<select v-model="director">
					<option value="free">Free</option>
					<option
						v-for="(team, i) in game.teams"
						:key="i"
						:value="team.googleName"
					>{{ team.name }}</option>
				</select>
			</div>

			<div>
				<label>Round: </label>
				<select v-model="game.currentRound">
					<option
						v-for="(round, i) in game.rounds"
						:key="i"
						:value="i"
					>Round {{ i + 1 }}</option>
				</select>
			</div>

			<div>
				<label>Question: </label>
				<select v-model="game.currentQuestion">
					<option
						v-for="(question, i) in round.questions"
						:key="i"
						:value="i"
					>{{ i + 1 }}: {{ question.category }}</option>
				</select>
			</div>

			<h4>Question</h4>

			<div>Category: {{ question.category }}</div>
			<div>Question: {{ question.question }}</div>
			<div>Detail: {{ question.detail }}</div>
			<div v-for="answer in question.openAnswers" :key="answer.answer">
				<AnswerBlock :answer="answer" @selected="setAnswer" :selected="answer1 === answer" />
			</div>
			<div>
				<AnswerBlock :answer="null" @selected="setAnswer" :selected="answer1 === wrongAnswer" />
			</div>

		</ControlBar>
		<ScriptBar />
	</div>
</template>

<style lang="scss">
	#fake-pointless {
		height: 100vh;
		width: 100vw;
		position: relative;
	}

	select {
		padding: 5px 10px;
	}
</style>
