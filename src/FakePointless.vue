<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import Scoreometer from '@/components/pl/Scoreometer.vue'
	import Timer from '@/components/pl/Timer.vue'
	import ChangeRound from '@/components/pl/ChangeRound.vue'
	import TeamDivide from '@/components/pl/TeamDivide.vue'
	import TeamScore from '@/components/pl/TeamScore.vue'
	import QuestionDisplay from '@/components/pl/QuestionDisplay.vue'
	import FinalAnswers from '@/components/pl/FinalAnswers.vue'
	import ScoresDisplay from '@/components/pl/ScoresDisplay.vue'
	import QuestionDetails from '@/components/pl/QuestionDetails.vue'
	import PointlessIntro from '@/components/pl/PointlessIntro.vue'
	import PointlessCredits from '@/components/pl/PointlessCredits.vue'
	import { PointlessAnswer, PointlessQuestion, PointlessTeam, PointlessGame, PLState, PointlessWrongAnswer } from '@/types/Pointless'
	import { game } from '@/services/pl/data'

	@Component({
		components: {
			DisplayArea,
			ControlBar,
			ScriptBar,
			Scoreometer,
			Timer,
			ChangeRound,
			TeamDivide,
			TeamScore,
			QuestionDisplay,
			FinalAnswers,
			ScoresDisplay,
			QuestionDetails,
			PointlessIntro,
			PointlessCredits
		}
	})
	export default class FakePointless extends Vue {

		public finalAnswers: string = ''

		public get director() { return (this.$store.state.pl as PLState).director }
		public set director(director: string) { this.$store.commit('plSetDirector', director) }

		public get screen() { return (this.$store.state.pl as PLState).screen }
		public set screen(screen: string) {
			this.$store.commit('plSetScreen', screen)
			this.autoDirect()
		}

		public autoDirect() {
			this.director = 'free'
			if (this.screen.endsWith('_current') && this.game.currentTeam) {
				this.director = this.game.currentTeam.googleName
			}
			this.game.teams.forEach((team) => {
				if (this.screen.endsWith(`_${team.name}`)) {
					this.director = team.googleName
				}
			})
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
			this.currentAnswer = answer || PointlessWrongAnswer
		}

		public setRound(round: number) {
			this.screen = 'change_round'
			this.game.currentRound = parseInt(round as any, 10)
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

		public setCurrentTeam(teamName: string) {
			this.game.currentTeam = this.game.teams.find((t) => t.name === teamName)
			this.autoDirect()
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

		public get showScoreDivideMode() {
			if (this.screen.startsWith('team_score')) {
				return 'left'
			} else if (this.screen.startsWith('score_team')) {
				return 'right'
			} else if (this.screen.startsWith('team_')) {
				return 'normal'
			}
			return 'none'
		}

		public get showScoreDivideTeam() {
			let teamName: string
			if (this.screen.startsWith('team_score') || this.screen.startsWith('score_team')) {
				teamName = this.screen.substr(11)
			} else if (this.screen.startsWith('team_')) {
				teamName = this.screen.substr(5)
			}
			if (teamName === 'current') {
				return this.game.currentTeam
			}
			return this.game.teams.find((t) => t.name === teamName)
		}

		public answerSubmitted(answer: PointlessAnswer) {
			if (this.game.currentTeam) {
				const score = answer === PointlessWrongAnswer ? this.question.max : answer.score
				this.game.currentTeam.score = (this.game.currentTeam.score || 0) + score
				this.game.currentTeam.answers++
			}
			this.game.guessedAnswers.push(answer)
		}

		public get leftName() {
			return game.currentTeam?.name.split('&')[0].trim()
		}

		public get rightName() {
			return game.currentTeam?.name.split('&')[1].trim()
		}

		public get currentTeams() {
			return game.teams.filter((t) => !t.out)
		}

		public get outTeams() {
			return game.teams.filter((t) => t.out)
		}

		public get currentAnswer() {
			const teamPos = this.currentTeams.findIndex((t) => t === game.currentTeam)
			if (game.currentRound === 2 && teamPos === 1) {
				return this.answer2
			} else {
				return this.answer1
			}
		}

		public set currentAnswer(answer: PointlessAnswer) {
			const teamPos = this.currentTeams.findIndex((t) => t === game.currentTeam)
			if (game.currentRound === 2 && teamPos === 1) {
				this.answer2 = answer
			} else {
				this.answer1 = answer
			}
		}

		public revealAnswer() {
			game.guessedAnswers.push(this.currentAnswer)
			this.currentAnswer = PointlessWrongAnswer
		}

	}
</script>

<template>
	<div id="fake-pointless">
		<DisplayArea :screenCapture="false">
			<QuestionDisplay
				v-show="screen === 'board'"
				:game="game"
				:answer="currentAnswer"
				@setAnswer="setAnswer"
				:key="game.currentRound"
			/>
			<ScoresDisplay v-show="screen === 'all_scores'" :game="game"/>
			<PointlessIntro v-if="screen === 'intro'" @finished="screen = 'nothing'" :game="game" />
			<PointlessCredits v-if="screen === 'credits'" @finished="screen = 'nothing'" />
			<ChangeRound v-if="screen === 'change_round'" @finished="screen = 'nothing'" :round="game.currentRound" />
			<Timer v-if="screen === 'timer'" @finished="screen = 'nothing'" />
			<FinalAnswers v-if="screen === 'final_answers'" :answers="finalAnswers" />
			<TeamDivide :mode="showTeamDivide" />
			<TeamScore
				v-if="showScoreDivideTeam && game.currentRound < 3"
				:game="game"
				:mode="showScoreDivideMode"
				:team="showScoreDivideTeam"
				:max="question.max"
			/>
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
							v-for="(team, i) in currentTeams"
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
						<option value="all_scores">All Scores</option>
						<option value="score">Score-o-meter</option>
						<optgroup label="Team View">
							<option v-for="(team, i) in currentTeams" :key="i" :value="`team_${team.name}`">{{ team.name }}</option>
						</optgroup>
						<optgroup label="Team / Score-o-meter">
							<option value="team_score_free">Team / Meter: Free</option>
							<option value="team_score_current">Team / Meter: {{ leftName || 'Current' }}</option>
						</optgroup>
						<optgroup label="Score-o-meter / Team">
							<option value="score_team_free">Meter / Team: Free</option>
							<option value="score_team_current">Meter / Team: {{ rightName || 'Current' }}</option>
						</optgroup>
					</select>
				</div>

				<div>
					<label>Team: </label>
					<select :value="game.currentTeam ? game.currentTeam.name : null" @change="setCurrentTeam($event.target.value)">
						<option :value="null">None</option>
						<option
							v-for="team in currentTeams"
							:key="team.name"
							:value="team.name"
						>{{ team.name }}</option>
					</select>
				</div>

				<div class="divide">
					<div><hr /></div>
					<div><hr /></div>
				</div>

				<div>
					<label>Pass: </label>
					<select v-model="game.currentPass">
						<option :value="1">1</option>
						<option :value="2">2</option>
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
			</div>

			<hr />
			
			<h3>Actions</h3>

			<div class="actions">
				<div><button class="btn" @click="screen = 'intro'">Title Sequence</button></div>
				<div v-if="game.currentRound === 3"><button class="btn" @click="screen = 'trophy'">Show Trophy</button></div>
				<div v-if="game.currentRound === 3"><button class="btn" @click="screen = 'timer'">Show Timer</button></div>
				<div v-if="game.currentRound === 3"><button class="btn" @click="screen = 'final_answers'">Show Final Answers</button></div>
				<div><button class="btn" @click="screen = 'credits'">Credits</button></div>
				<div><button class="btn" @click="revealAnswer">Reveal Current Answer</button></div>
			</div>

			<hr />

			<div v-if="game.currentRound === 3">
				<div>Answers (split on line)</div>
				<textarea style="height: 5em; width: 100%" v-model="finalAnswers"></textarea>
				<div><button class="btn" @click="screen = 'finalAnswers'">Submit</button></div>
				<hr />
			</div>

			<QuestionDetails :game="game" :answer="currentAnswer" @setAnswer="setAnswer" :key="question.category" />

		</ControlBar>
		<ScriptBar>
			<div style="display: flex; width: 100%;">
				<div style="flex-grow: 1;" v-for="team in game.teams" :key="team.name">
					<TeamScore :team="team" :off="team.out" :game="game" :max="question.max" />
					<div :key="team.name" class="actions">
						<div><button v-if="!team.out" class="btn" @click="team.out = true">Remove Team</button></div>
						<div><button v-if="team.out" class="btn" @click="team.out = false">Add Team Back</button></div>
						<div v-if="team !== game.currentTeam && !team.out">
							<button class="btn" @click="setCurrentTeam(team.name)">Set Current Team</button>
						</div>
						<div v-if="team === game.currentTeam"><small>Current Team</small></div>
					</div>
				</div>
			</div>
		</ScriptBar> 
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

	hr {
		border: none;
		border-top: 1px solid rgba(255, 255, 255, 0.25);
		margin: 1rem 0;
	}

	.actions {
		& > div {
			margin-bottom: 0.5rem;
		}
	}

	@import '@/style/sizing.scss';
	
	.options {
		display: table;
		& > * {
			display: table-row;

			&.divide > *,
			&.divide > *:nth-child(1) {
				padding-right: 0;
			}

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
