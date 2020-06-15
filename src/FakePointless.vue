<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import Scoreometer from '@/components/pl/Scoreometer.vue'
	import AnswerBlock from '@/components/pl/AnswerBlock.vue'
	import TeamDivide from '@/components/pl/TeamDivide.vue'
	import { PointlessAnswer, PointlessQuestion, PointlessTeam, PointlessGame, PLState } from '@/types/Pointless'
	import { game } from '@/services/pl/data'

	@Component({
		components: { DisplayArea, ControlBar, ScriptBar, Scoreometer, AnswerBlock, TeamDivide }
	})
	export default class FakePointless extends Vue {

		public get director() { return (this.$store.state.pl as PLState).director }
		public set director(director: string) { this.$store.commit('plSetDirector', director) }

		public get screen() { return (this.$store.state.pl as PLState).screen }
		public set screen(screen: string) {
			this.game.teams.forEach((team) => {
				if (screen.endsWith(`_${team.name}`)) {
					this.director = team.googleName
				}
			})
			this.$store.commit('plSetScreen', screen)
		}

		public game: PointlessGame = game

		public wrongAnswer: PointlessAnswer = {
			answer: '✘',
			score: 100
		}

		public answer1: PointlessAnswer = this.wrongAnswer
		public answer2: PointlessAnswer = this.wrongAnswer

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

		public get showScore() {
			if (this.screen.startsWith('team_score')) {
				return 'right'
			} else if (this.screen.startsWith('score_team')) {
				return 'left'
			} else if (this.screen.startsWith('team_')) {
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

	}
</script>

<template>
	<div id="fake-pointless">
		<DisplayArea :screenCapture="false">
			<TeamDivide :mode="showTeamDivide" />
			<div :class="{ 'score-container': true, [showScore]: true }">
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
			</div>
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
				<label>View: </label>
				<select v-model="screen">
					<option value="nothing">Nothing</option>
					<option value="board">Question Board</option>
					<option value="score">Score-o-meter</option>
					<optgroup label="Team View">
						<option v-for="(team, i) in game.teams" :key="i" :value="`team_${team.name}`">Team View: {{ team.name }}</option>
					</optgroup>
					<optgroup label="Team / Score-o-meter">
						<option v-for="(team, i) in game.teams" :key="i" :value="`team_score_${team.name}`">Team / Meter: {{ team.name }}</option>
					</optgroup>
					<optgroup label="Score-o-meter / Team">
						<option v-for="(team, i) in game.teams" :key="i" :value="`score_team_${team.name}`">Meter / Team: {{ team.name }}</option>
					</optgroup>
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
			<div>
				<AnswerBlock :answer="null" size="small" @selected="setAnswer" :selected="answer1 === wrongAnswer" />
			</div>
			<div v-for="answer in question.openAnswers" :key="answer.answer">
				<AnswerBlock :answer="answer" size="small" @selected="setAnswer" :selected="answer1 === answer" />
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


	@import '@/style/sizing.scss';
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
