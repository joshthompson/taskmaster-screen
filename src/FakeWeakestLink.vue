<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { getState } from './services/data'
	import Contestant from '@/components/wl/Contestant.vue'
	import Script from '@/services/WLScript'
	import Questions from '@/services/WLQuestions'
	
	interface WLContestant {
		name: string
		out: boolean
		right?: number
		time?: number
		banked?: number
		lost?: number
		total?: number
	}

	async function sleep(ms: number) {
		await new Promise((r) => setTimeout(r, ms))
	}

	type GameState = 'none' | 'round' | 'voting' | 'final'

	@Component({
		components: { Contestant }
	})
	export default class FakeWeakestLink extends Vue {

		// public values = [ 0.10, 0.25, 0.50, 0.75, 1.00, 2.00, 3.00, 5.00, 7.50, 10.00 ]
		public values = [ 5, 10, 25, 50, 100, 150, 250, 375, 500 ]
		public contestantNames:string = 'Josh, Holly, Craig, Paul, Esther, Vicki, Nick, Tanya'
		// public contestantNames:string = 'Anne, Jack, Pete, Rebekah, Guy, Lisa, James, Nick'

		public contestants: WLContestant[] = []
		public banked = 0
		public current = 0
		public timer = 0
		public started = false
		public reallyStarted = false
		public contestant = 0
		public questionStart = 0
		public strongest = []
		public state: GameState = 'none'
		public round: number = 0
		public dumb: string = ''
		public script: string = ''

		public money(value) {
			return value === 500 ? '🧻 1 roll' : `${value} sheets`
			return '£' + value.toFixed(2)
		}

		public created() {
			window.addEventListener('keypress', (event) => {
				if (this.contestants.length && event.code === 'Space' && !this.started) this.start()
				else if (this.reallyStarted && event.code === 'Space' && this.started) this.right()
				else if (this.reallyStarted && event.code === 'Enter') this.wrong()
				else if (this.reallyStarted && event.code === 'KeyB') this.bank()
			})
		}

		public removeOldAudio() {
			Array.from(document.querySelectorAll('audio'))
				.filter((e) => e !== this.music)
				.forEach((e) => e.remove())
		}

		public styles(i) {
			const s: CSSStyleDeclaration | any = {}
			if (i >= 1) {
				if (i < this.current) {
					s.marginBottom = `-3vh`
				}
				if (i === this.current - 1 || i === this.current - 0.5) {
					s.marginTop = `${(i) * 3 + 1}vh`
				}
			}
			return s
		}

		public right() {
			if (this.current === 0) {
				this.current++
			} else {
				this.current = Math.min(this.values.length, this.current + 0.5)
				setTimeout(() => this.current = Math.min(this.values.length, this.current + 0.5), 300)
			}
			this.currentContestant.right++
			this.currentContestant.total++
			this.nextQuestion()
		}

		public wrong() {
			this.currentContestant.total++
			const lost = Math.min(this.value, this.max - this.banked)
			this.currentContestant.lost += lost
			this.current = 0
			this.nextQuestion()
		}

		private endQuestion() {
			this.currentContestant.time += Date.now() - this.questionStart
			this.statistics()
		}

		private getQuestion() {
			const question = Questions.getQuestion(this.round)
			this.script = `
				<div>${this.currentContestant.name}, ${question.q}</div>
				<div class="answer">${question.a}</div>
			`
		}

		private nextQuestion() {
			this.endQuestion()
			this.questionStart = Date.now()
			this.nextContestant()
			this.getQuestion()
		}

		private nextContestant() {
			do {
				this.contestant = (this.contestant + 1) % this.contestants.length
			} while (this.currentContestant.out)
		}

		private get value() {
			return this.values[this.current - 1] || 0
		}

		private get max() {
			return this.values[this.values.length - 1]
		}

		public bank() {
			const before = this.banked
			this.banked = Math.min(this.banked + this.value, this.max)
			this.currentContestant.banked += this.banked - before
			this.current = 0
			if (this.banked >= this.max) {
				this.end()
			}
			this.statistics()
		}

		public get time() {
			const mins = Math.floor(this.timer / 60)
			const secs = Math.floor(this.timer % 60)
			return `${mins}:${secs < 10 ? `0${secs}` : secs}`
		}

		public async start() {
			this.started = true
			this.timer = 180
			this.banked = 0
			this.current = 0
			this.round++
			this.contestant = this.contestants.findIndex((c) => c.name === this.strongest[0].name)
			this.contestants.forEach((c) => {
				c.right = 0
				c.time = 0
				c.banked = 0
				c.lost = 0
				c.total = 0
			})
			await this.startMusic()
			this.reallyStarted = true
			this.getQuestion()
			this.questionStart = Date.now()
			setTimeout(() => this.runTimer(), 1000) // 4 seconds music start + 1 second until we drop first second
		}

		public async end() {
			this.reallyStarted = false
			this.endQuestion()
			this.music.currentTime = 310.3
			this.script = Script.empty
			await sleep(3500)
			this.script = Script.endOfRound
			this.started = false
		}

		private statistics() {
			this.dumb = Math.random().toString(16)
			this.strongest = this.contestants.filter((c) => !c.out).sort((a, b) => {
				// Percentage of questions right
				if (a.right / a.total < b.right / b.total) return 1
				if (a.right / a.total > b.right / b.total) return -1

				// Banked more
				if (a.banked < b.banked) return 1
				if (a.banked > b.banked) return -1

				// Lost less
				if (a.lost > b.lost) return 1
				if (a.lost < b.lost) return -1

				// Time
				if (a.time / a.total > b.time / b.total) return 1
				if (a.time / a.total < b.time / b.total) return -1

				// More questions
				if (a.total < b.total) return 1
				if (a.total > b.total) return -1

				// IDENTICAL!
				return 0
			})
		}

		public get contenstantOut() {
			return this.contestants.filter((c) => c.out)
		}

		public async startMusic() {
			this.music.currentTime = 0
			this.music.play()
			this.script = Script.empty
			await sleep(3000)
			this.script = Script.startClock
			await sleep(1000)
			this.music.currentTime = 9.5
			await sleep(1000)
			this.script = Script.empty
		}

		public get currentContestant() {
			return this.contestants[this.contestant]
		}

		public get music() {
			return this.$refs.music as HTMLAudioElement
		}

		public runTimer() {
			if (this.reallyStarted) {
				this.timer--
			}

			if (this.timer === 0) {
				this.end()
			} else {
				setTimeout(() => this.runTimer(), 1000)
			}
		}

		public setup() {
			this.contestants = this.contestantNames.split(',').map((n): WLContestant => ({ name: n.trim(), out: false }))
			this.contestants.sort((a, b) => a.name > b.name ? 1 : -1)
			this.statistics()
			this.script = Script.intro
		}

		public contestantOut(contestant: WLContestant, out: boolean) {
			this.contestants.find((c) => c.name === contestant.name).out = out
			this.statistics()
		}
	}
</script>

<template>
	<div id="fake-weakest-link">
		<div id="film-area">
			<audio ref="music" src="/weakest-link/round.mp3" />
			<div class="logo" v-if="!started && this.contestants.length"></div>
			
			<div class="ladder" v-if="started">
				<div class="value bank"> {{ money(banked) }}</div>
				<div
					v-for="(val, i) in values"
					:key="i"
					class="value"
					:class="{
						done: i < current,
						current: i === current || i === current - 0.5,
						top: i === values.length - 1
					}"
					:style="styles(i)"
				> {{ money(val) }}</div>
			</div>
			<div class="contestant" v-if="reallyStarted">
				{{ currentContestant.name }}
			</div>
			<div class="timer" v-if="started">
				{{ time }}
			</div>
		</div>

		<div id="info-bar">
			<h2>Weakest Link<span v-if="round > 0">: Round {{ round }}</span></h2>
			<div v-if="!this.contestants.length">
				<textarea type="text" v-model="contestantNames"></textarea>
				<p><button @click="setup" class="btn">Start</button></p>
			</div>
			<div>
				<h3>Strongest Link</h3>
				<Contestant
					v-for="contestant in strongest"
					:key="dumb + contestant.name"
					:contestant="contestant"
					@out="contestantOut(contestant, $event)"
				/>
			</div>
			<div v-if="contenstantOut.length">
				<Contestant
					v-for="contestant in contenstantOut"
					:key="dumb + contestant.name"
					:contestant="contestant"
					@out="contestantOut(contestant, $event)"
				/>
			</div>
		</div>

		<div id="bottom-bar" v-html="script"></div>
	</div>
</template>

<style lang="scss" scoped>
	$vh-height: 80vh;
	$vh-width: 80vh * 16 / 9;
	$vw-height: 80vw * 9 / 16;
	$vw-width: 80vw;

	$width: min(#{$vw-width}, #{$vh-width});
	$height: min(#{$vw-height}, #{$vh-height});

	$s1: calc(0.01 * #{$height});
	$s2_5: calc(0.025 * #{$height});
	$s3_5: calc(0.035 * #{$height});
	$s4: calc(0.04 * #{$height});
	$s5: calc(0.05 * #{$height});
	$s7_5: calc(0.075 * #{$height});
	$s10: calc(0.1 * #{$height});
	$s15: calc(0.15 * #{$height});
	$s20: calc(0.2 * #{$height});
	$s25: calc(0.25 * #{$height});
	$s30: calc(0.3 * #{$height});
	$s60: calc(0.6 * #{$height});
	$s70: calc(0.7 * #{$height});
	$s90: calc(0.9 * #{$height});

	#fake-weakest-link {
		height: 100vh;
		width: 100vw;
		position: relative;
	}

	#film-area {
		position: relative;
		width: $width;
		height: $height;
		margin: 0;
		background: #00FF00;
	}

	#info-bar {
		position: absolute;
		top: 0;
		right: 0;
		width: calc(100vw - #{$width});
		height: $height;
		background: #444444;
		color: #FFFFFF;
		padding: 1rem;
		overflow: auto;

		h2 {
			margin: 0 0 1rem;
		}

		textarea {
			padding: 0.5rem;
			width: 100%;
			font-size: 1rem;
			min-height: 3.5rem;
			resize: vertical;
		}
	}

	#bottom-bar {
		$textSize: calc((100vh - #{$height}) / 5);
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: calc(100vh - #{$height});
		background: #000000;
		color: #FFFFFF;
		padding: 1rem;
		text-align: center;
		line-height: $textSize;
		font-size: $textSize;
		overflow: auto;
	}

	.ladder {
		position: absolute;
		display: flex;
		flex-direction: column-reverse;
		height: $s90;
		bottom: $s5;
		left: $s5;
		.value {
			flex-grow: 1;
			line-height: $s5;
			font-weight: bold;
			text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
			font-size: $s2_5;
			width: $s20;
			margin-top: $s1;

			background-image: url('assets/weakest-link/Next.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			// outline: 2px dotted red;

			&.current {
				background-image: url('assets/weakest-link/Current.png');
			}

			&.bank {
				height: $s10;
				line-height: $s7_5;
				font-size: $s3_5;
				background-image: url('assets/weakest-link/Bank.png');
				z-index: 1;
			}
			&.top {
				height: $s10;
				line-height: $s10;
				font-size: $s4;
			}
		}
	}

	.logo {
		position: absolute;
		bottom: $s5;
		right: $s5;
		background-image: url('assets/weakest-link/logo.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: $s15;
		height: $s15;
	}

	.timer {
		position: absolute;
		bottom: $s5;
		right: $s5;
		background-image: url('assets/weakest-link/Clock.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: $s25;
		height: $s15;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: $s5;
		line-height: $s15;
	}

	.contestant {
		position: absolute;
		text-transform: uppercase;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: $s70;
		color: white;
		height: $s30;
		line-height: $s30;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: $s10;
		border-radius: 50%;
		background-image: url('assets/weakest-link/name.png');
		background-size: 100% 100%;
		background-position: center bottom;
		background-repeat: no-repeat;

	}
</style>

<style lang="scss">
	#bottom-bar .answer {
		margin-top: 0.5rem;
		color: #008DD4;
	}
</style>