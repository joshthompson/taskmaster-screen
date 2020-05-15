<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { getState } from './services/data'
	
	interface WLContestant {
		name: string
		right?: number
		time?: number
		banked?: number
		lost?: number
		total?: number
	}

	async function sleep(ms: number) {
		await new Promise(r => setTimeout(r, ms));
	}

	@Component({
		components: {}
	})
	export default class FakeWeakestLink extends Vue {
		public values = [
			0.10,
			0.25,
			0.50,
			0.75,
			1.00,
			2.00,
			3.00,
			5.00,
			7.50,
			10.00
		]
		public contestants: WLContestant[] = [
			{ name: 'Craig' },
			{ name: 'Holly' },
			{ name: 'Leo' },
			{ name: 'Vicki' },
			{ name: 'Tanya' },
			{ name: 'Nick' },
			{ name: 'Paul' },
			{ name: 'Josh' }
		]
		public banked = 0
		public current = 0
		public timer = 0
		public started = false
		public reallyStarted = false
		public contestant = 0
		public questionStart = 0
		public strongest = []

		public money(value) {
			return '£' + value.toFixed(2)
		}

		public created() {
			window.addEventListener('keypress', (event) => {
				if (event.code === 'Space' && !this.started) this.start()
				else if (this.reallyStarted && event.code === 'Space' && this.started) this.right()
				else if (this.reallyStarted && event.code === 'Enter') this.wrong()
				else if (this.reallyStarted && event.code === 'KeyB') this.bank()
			})
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
			// Increment time for current question
			this.currentContestant.time += Date.now() - this.questionStart
		}

		private nextQuestion() {
			this.endQuestion()
			this.questionStart = Date.now()
			this.contestant = (this.contestant + 1) % this.contestants.length
		}

		private get value() {
			return this.values[this.current - 1] || 0
		}

		private get max() {
			return this.values[this.values.length - 1]
		}

		public bank() {
			const before = this.banked
			console.log(this.value)
			this.banked = Math.min(this.banked + this.value, this.max)
			this.currentContestant.banked += this.banked - before
			this.current = 0
			if (this.banked === this.max) {
				this.end()
			}
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
			this.contestants.forEach(c => {
				c.right = 0
				c.time = 0
				c.banked = 0
				c.lost = 0
				c.total = 0
			})
			await this.startMusic()
			this.reallyStarted = true
			this.questionStart = Date.now()
			setTimeout(() => this.runTimer(), 1000) // 4 seconds music start + 1 second until we drop first second
		}

		public async end() {
			this.reallyStarted = false
			this.endQuestion()
			this.statistics()
			this.music.currentTime = 310.3
			await sleep(3500)
			this.started = false
		}

		private statistics() {
			const sorted = this.contestants.sort((a, b) => {
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
			this.strongest = sorted.map(c => c.name)
		}

		public async startMusic() {
			this.music.currentTime = 0
			this.music.play()
			await sleep(4000)
			this.music.currentTime = 9.5
			await sleep(1000)
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
	}
</script>

<template>
	<div id="fake-weakest-link">
		<audio ref="music" src="/weakest-link/round.mp3" />
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

		<div style="background: white; color: black">{{ contestants }}<hr style="border: 1px solid black; margin: 0.5rem"/></div>
		<div style="background: white; color: black">{{ strongest }}</div>
	</div>
</template>

<style lang="scss" scoped>
	#fake-weakest-link {
		background: #00FF00;
		height: 100vh;
		width: 100vw;
		position: relative;
	}

	$size: 6.5vh;
	.ladder {
		position: absolute;
		display: flex;
		flex-direction: column-reverse;
		height: 90vh;
		bottom: 5vh;
		left: 5vh;
		.value {
			// height: $size;
			flex-grow: 1;
			line-height: $size * 0.75;
			font-weight: bold;
			text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
			font-size: $size / 2.5;
			width: 3 * $size;
			margin-top: 1vh;

			background-image: url('assets/weakest-link/Next.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			// outline: 2px dotted red;

			&.current {
				background-image: url('assets/weakest-link/Current.png');
			}

			&.bank {
				height: $size * 1.5;
				line-height: $size * 1.5 * 0.75;
				font-size: $size / 1.75;
				background-image: url('assets/weakest-link/Bank.png');
				z-index: 1;
			}
			&.top {
				height: $size * 1.5;
				line-height: $size * 1.5;
				font-size: $size / 1.75;
			}
		}
	}

	.timer {
		position: absolute;
		bottom: 5vh;
		right: 5vh;
		background-image: url('assets/weakest-link/Clock.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: 25vh;
		height: 15vh;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: 5vh;
		line-height: 15vh;
	}

	.contestant {
		position: absolute;
		text-transform: uppercase;
		bottom: 0vh;
		left: 50vw;
		transform: translateX(-50%);
		width: 50vw;
		color: white;
		height: 30vh;
		line-height: 30vh;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: 10vh;
		border-radius: 50%;
		background-image: url('assets/weakest-link/name.png');
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;

	}
</style>