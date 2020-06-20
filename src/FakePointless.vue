<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import Scoreometer from '@/components/pl/Scoreometer.vue'
	import TeamDivide from '@/components/pl/TeamDivide.vue'
	import QuestionDisplay from '@/components/pl/QuestionDisplay.vue'
	import QuestionDetails from '@/components/pl/QuestionDetails.vue'
	import { PointlessAnswer, PointlessQuestion, PointlessTeam, PointlessGame, PLState, PointlessWrongAnswer } from '@/types/Pointless'
	import { game } from '@/services/pl/data'

	@Component({
		components: {
			DisplayArea,
			ControlBar,
			ScriptBar,
			Scoreometer,
			TeamDivide,
			QuestionDisplay,
			QuestionDetails
		}
	})
	export default class FakePointless extends Vue {

		public get director() { return (this.$store.state.pl as PLState).director }
		public set director(director: string) { this.$store.commit('plSetDirector', director) }

		public get screen() { return (this.$store.state.pl as PLState).screen }
		public set screen(screen: string) {
			if (screen.endsWith('_free')) {
				this.director = 'free'
			} else {
				this.game.teams.forEach((team) => {
					if (screen.endsWith(`_${team.name}`)) {
						this.director = team.googleName
					}
				})
			}
			this.$store.commit('plSetScreen', screen)
		}

		public game: PointlessGame = game

		public answer1: PointlessAnswer = PointlessWrongAnswer
		public answer2: PointlessAnswer = PointlessWrongAnswer

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
			this.answer1 = answer || PointlessWrongAnswer
		}

		public setRound(round: number) {
			this.game.currentRound = round
			this.setQuestion(0)
		}

		public setQuestion(question: number) {
			this.game.currentQuestion = question
			this.game.guessedAnswers = []
			this.game.currentPass = 1
			this.game.teams.forEach((team) => {
				team.answers = 0
			})
		}

		public get showScore() {
			if (this.screen.startsWith('team_score')) {
				return 'right'
			} else if (this.screen.startsWith('score_team')) {
				return 'left'
			} else if (this.screen.startsWith('score')) {
				return 'normal'
			}
			return 'none'
		}

		public get showTeamDivide() {
			if (this.screen.startsWith('team_score')) {
				return 'left'
			} else if (this.screen.startsWith('score_team')) {
				return 'right'
			}
			return 'none'
		}

		public answerSubmitted(answer: PointlessAnswer) {
			this.game.currentTeam.score = (this.game.currentTeam.score || 0) + answer.score
			this.game.currentTeam.answers = 0
			this.game.guessedAnswers.push(answer)
		}

	}
</script>

<template>
	<div id="fake-pointless">
		<DisplayArea :screenCapture="false">
			<QuestionDisplay
				v-show="screen === 'board'"
				:game="game"
				:answer="answer1"
				@setAnswer="setAnswer"
			/>
			<TeamDivide :mode="showTeamDivide" />
			<!-- <TeamScore :team="showTeamScore" /> -->
			<div :class="{ 'score-container': true, [showScore]: true }">
				<Scoreometer
					:game="game"
					:answer="answer1"
					:type="double ? 'left' : 'standard'"
					:key="question.question + 1 + answer1.answer"
					@answerSubmitted="answerSubmitted"
				/>
				<Scoreometer
					:game="game"
					:answer="answer2"
					v-if="double" type="right"
					:key="question.question + 2 + answer2.answer"
					@answerSubmitted="answerSubmitted"
				/>
			</div>
		</DisplayArea>
		<ControlBar class="contol-bar">
			<h3>Pointless</h3>

			<div class="options">
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
					<label>View: </label>
					<select v-model="screen">
						<option value="nothing">Nothing</option>
						<option value="board">Question Board</option>
						<option value="score">Score-o-meter</option>
						<optgroup label="Team View">
							<option value="team_free">Team View: Free</option>
							<option v-for="(team, i) in game.teams" :key="i" :value="`team_${team.name}`">Team View: {{ team.name }}</option>
						</optgroup>
						<optgroup label="Team / Score-o-meter">
							<option value="team_score_free">Team / Meter: Free</option>
							<option v-for="(team, i) in game.teams" :key="i" :value="`team_score_${team.name}`">Team / Meter: {{ team.name }}</option>
						</optgroup>
						<optgroup label="Score-o-meter / Team">
							<option value="score_team_free">Meter / Team: Free</option>
							<option v-for="(team, i) in game.teams" :key="i" :value="`score_team_${team.name}`">Meter / Team: {{ team.name }}</option>
						</optgroup>
					</select>
				</div>

				<div>
					<label>Round: </label>
					<select :value="game.currentRound" @change="setRound($event.target.value)">
						<option
							v-for="(round, i) in game.rounds"
							:key="i"
							:value="i"
						>Round {{ i + 1 }}</option>
					</select>
				</div>

				<div>
					<label>Question: </label>
					<select :value="game.currentQuestion" @change="setQuestion($event.target.value)">
						<option
							v-for="(question, i) in round.questions"
							:key="i"
							:value="i"
						>{{ i + 1 }}: {{ question.category }}</option>
					</select>
				</div>

				<div>
					<label>Current Team: </label>
					<select v-model="game.currentTeam">
						<option :value="null">None</option>
						<option
							v-for="team in game.teams"
							:key="team.name"
							:value="team"
						>{{ team.name }}</option>
					</select>
				</div>
			</div>

			<QuestionDetails :question="question" :answer="answer1" @setAnswer="setAnswer" />

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

	.contol-bar {
		text-align: left;
	}

	@import '@/style/sizing.scss';
	
	.options {
		display: table;
		& > * {
			display: table-row;
			& > * {
				display: table-cell;
				&:nth-child(1) {
					padding-right: 0.5em;
				}
				&:nth-child(2) {
					width: 100%;
				}
			}
		}
	}

	.score-container {
		$offset: 3;
		position: relative;
		z-index: 500;

		&.right {
			transform: translateX(s(-$offset));
		}

		&.left {
			transform: translateX(-100%) translateX(s(40 + $offset));
		}

		&.none {
			display: none;
		}
	}

</style>
