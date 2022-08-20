<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import OBSWebSocket from 'obs-websocket-js'
	import { io } from 'socket.io-client';
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import WOFBoard from '@/components/wof/WOFBoard.vue'
	import WOFWheel, { Token } from '@/components/wof/WOFWheel.vue'
	import WOFLogo from '@/components/wof/WOFLogo.vue'
	import WOFAudio from '@/services/wof/WOFAudio'
	import OBS from '@/services/shared/OBS'
	import { AppState } from './types'

	interface Clue {
		original: string
		category: string
		guesses: Set<string>
		letters: string[][]
		classes: ClueClass[][]
		roundType: RoundType
	}

	enum ClueClass {
		void = '_',
		blank = '-',
		hidden = 'X',
		found = 'H',
		letter = 'O',
		star = 'S'
	}

	export enum RoundType {
		NORMAL = 'normal',
		DOUBLE = 'double',
		FINAL = 'final'
	}

	enum InventoryItems {
		FREE_SPIN = 'Free Spin'
	}
	
	export interface Contestant {
		name: string
		score: number
		total: number
		inventory: (InventoryItems | string)[]
	}

	const maxLength = 12
	const maxLines = 4
	const foundDelay = 1000
	const revealDelay = 500
	const fastReveal = 30
	const boardAnimationDelay = 500
	const boardAnimationTime = 10_000

	const vowelCost = 250

	@Component({
		components: {
			DisplayArea,
			ControlBar,
			ScriptBar,
			WOFBoard,
			WOFWheel,
			WOFLogo
		}
	})
	export default class FakeWheelOfFortune extends Vue {

		public scenes: OBSWebSocket.Scene[] = []
		public view: 'board' | 'wheel' | 'logo' | 'titles' | 'pre' = 'wheel'
		public round = RoundType.NORMAL;
		public readonly Token = Token;

		public clues: Clue[] = [
			this.createClue('In the twinkling of an eye', 'Phrases', RoundType.NORMAL),
			this.createClue('I like big butts and I cannot lie', 'Song lyrics', RoundType.DOUBLE),
			this.createClue('The Great Pyramids of Giza', 'Famous Places', RoundType.DOUBLE),
			this.createClue('In for a penny, in for a pound', 'Phrases', RoundType.DOUBLE),
			// this.createClue('Call the Midwife', 'TV Show'),
			// this.createClue('Ed Sheeran Shape Of You', 'Singer/Song'),
			// this.createClue('Fifty Shades Of Grey', 'Book'),
			this.createClue('Lewis Hamilton', 'Sporting Greats', RoundType.FINAL),
		]
		public clueNumber = 0
		public clue = this.clues[this.clueNumber]
		public finalGuess = ''
		public animateBoard = false
		public showTotals = false
		
		public contestants: Contestant[] = [
			{ name: 'Ringo', score: 0, total: 0, inventory: [] },
			{ name: 'Jamie', score: 0, total: 0, inventory: [] },
			{ name: 'Remi', score: 0, total: 0, inventory: [] },
		];
		public current: number = 0
		public guessValue: number = 0

		public async created() {

			OBS.setTextAndCenter('Wheel Of Fortune', 'Category Name', this.clue.category.toUpperCase())

			// const settings = await OBS.getSourceSettings()
			this.scenes = (await OBS.getScenes()).scenes


			console.log({
				// settings,
				scenes: this.scenes
			})

			const socket = io.connect(':6226', { autoConnect: true })
			socket.on('connect', () => {
				socket.emit('hi')
				socket.on('spin', speed => {
					this.spin()
					console.log(speed)
				})
			});
			
		}

		public readonly consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
		public readonly vowels = 'AEIOU'
		public readonly vowelCost = vowelCost
		public readonly RoundType = RoundType

		private createClue(clue: string, category: string = null, roundType: RoundType, maxLineLength = maxLength) {
			const lines: string[][] = [[]]
			let longest = 0
			clue.split(' ').forEach(word => {
				const lineLength = lines[lines.length - 1].join(' ').length
				if (lineLength + word.length + 1 <= maxLineLength) {
					lines[lines.length - 1].push(word)
				} else {
					lines[lines.length] = [word]
				}
				longest = Math.max(longest, lines[lines.length - 1].join(' ').length)
			})
			const left = 1 + Math.floor((maxLength - longest) / 2)
			const top = Math.floor((maxLines - lines.length) / 2)

			const clueObj: Clue = {
				original: clue,
				category,
				guesses: new Set(),
				letters: this.tiles(),
				classes: this.tiles(),
				roundType
			}

			lines.forEach((line, i) => {
				line.join(' ').split('').forEach((char, j) => {
					clueObj.letters[top + i][left + j] = char
					clueObj.classes[top + i][left + j] =
						char === ' ' ? ClueClass.blank : (char.match(/[A-z]/g) ? ClueClass.hidden : ClueClass.letter)
				})
			})
			return clueObj
		}

		public addClue() {
			this.clues.push(this.createClue(
				prompt('Clue'),
				prompt('Category'),
				prompt('Round', 'normal, double, final') as RoundType
			))
		}

		private tiles() {
			const tiles = new Array(maxLines).fill(null).map(() => new Array(maxLength + 2).fill(ClueClass.blank))
			tiles[0][0] = ClueClass.void
			tiles[0][tiles[0].length - 1] = ClueClass.void
			tiles[tiles.length - 1][0] = ClueClass.void
			tiles[tiles.length - 1][tiles[0].length - 1] = ClueClass.void
			return tiles
		}

		public revealAll() {
			this.clue.classes.forEach((row, i) => row.forEach((_, j) => {
				if (this.clue.classes[i][j] === ClueClass.hidden) {
					this.clue.classes[i][j] = ClueClass.found
				}
			}))
			this.clue = { ...this.clue }
			setTimeout(() => this.animateBoard = true, boardAnimationDelay)
			setTimeout(() => this.animateBoard = false, boardAnimationDelay + boardAnimationTime)
			this.revealFound(fastReveal)
			this.addScoresToTotals()
		}

		private addScoresToTotals() {
			this.contestants = this.contestants.map(contestant => ({
				...contestant,
				total: contestant.total + contestant.score
			}))
		}

		public hideAll() {
			this.clue.classes.forEach((row, i) => row.forEach((_, j) => {
				if ([ClueClass.found, ClueClass.letter].includes(this.clue.classes[i][j])) {
					this.clue.classes[i][j] = ClueClass.hidden
				}
			}))
			this.clue = {
				...this.clue,
				guesses: new Set()
			}
			
		}

		public setRound(number: number) {
			this.clues[this.clueNumber] = this.clue
			this.clueNumber = number
			this.clue = this.clues[this.clueNumber]
			this.contestants = this.contestants.map(contestant => ({ ...contestant, score: 0 }))
			if (this.clue.roundType) {
				this.round = this.clue.roundType;
			}
		}

		public letter(search: string, delay = foundDelay) {
			const letters = search.split('').map(l => l.substring(0, 1).toUpperCase()).filter(l => l !== ' ')
			const found: [number, number][] = []
			letters.forEach(letter => this.clue.guesses.add(letter))
			this.clue.letters.forEach((row, i) => {
				row.forEach((tile, j) => {
					if (letters.includes(tile.toUpperCase())) {
						found.push([i, j])
					}
				})
			})
			found.forEach(([i, j], n) => {
				this.clue.classes[i][j] = ClueClass.hidden
				setTimeout(() => {
					this.clue.classes[i][j] = ClueClass.found
					WOFAudio.bing()
					this.clue = { ...this.clue }
					
					this.currentContestant.score = parseInt('' + this.currentContestant.score) || 0
					this.currentContestant.score += this.multiplier * parseInt(this.guessValue.toString())
				}, delay * n)
			})
			setTimeout(() => this.revealFound(), delay * found.length)
			this.clue = { ...this.clue }

			if (found.length === 0) {
				WOFAudio.wrong()
			}
		}

		get multiplier() {
			switch (this.round) {
				case RoundType.NORMAL: return 1
				case RoundType.DOUBLE: return 2
				case RoundType.FINAL: return 0
				default: return 1
			}
		}

		public revealFound(delay = revealDelay) {
			const found: [number, number][] = []
			this.clue.classes.forEach((row, i) => {
				row.forEach((tile, j) => {
					if (tile === ClueClass.found) {
						found.push([i, j])
					}
				})
			})
			found.forEach(([i, j], n) => {
				setTimeout(() => {
					this.clue.classes[i][j] = ClueClass.letter
					this.clue = { ...this.clue }
				}, delay * n)
			})
		}

		public submitFinalGuess() {
			this.letter(this.finalGuess)
		}

		public buyVowel(vowel: string) {
			if (this.currentContestant.score >= vowelCost) {
				this.currentContestant.score -= vowelCost
				this.letter(vowel)
			}
		}

		public get currentContestant() {
			return this.contestants[this.current]
		}

		public addContestant() {
			this.contestants = [
				...this.contestants,
				{ name: prompt('Name'), score: 0, total: 0, inventory: [] }
			]
		}

		public switchContestant(n: number) {
			this.current += this.contestants.length * 100 + n
			this.current %= this.contestants.length
		}

		public bankrupt() {
			this.currentContestant.score = 0
			this.switchContestant(1)
			WOFAudio.bankrupt()
		}

		public loseATurn() {
			this.switchContestant(1)
			WOFAudio.wrong()
		}

		public freeSpin() {
			this.currentContestant.inventory.push(InventoryItems.FREE_SPIN)
		}

		public setGuessValue(value: number) {
			this.guessValue = value
		}

		public get allConsonants() {
			return this.clue.original.toUpperCase().split('').filter(l => 
				this.consonants.includes(l) && !this.clue.guesses.has(l)
			).length === 0;
		}

		public useItem(c: number, i: number) {
			const item = this.contestants[c].inventory[i]

			switch (item) {
				case InventoryItems.FREE_SPIN:
					this.removeItem(c, i)
					this.current = c
					break
				default:
					break
			}
		}

		public removeItem(c: number, i: number) {
			this.contestants[c].inventory.splice(i, 1)
		}


		public get volume() {
			return (this.$store.state as AppState).volume
		}

		public setVolume(event) {
			WOFAudio.setVolume(parseFloat(event.target.value))
		}

		public toggleShowTotals() {
			this.showTotals = !this.showTotals
		}

		public addToken(token: Token) {
			(this.$refs.wheel as WOFWheel).addToken(token)
		}

		public spin() {
			(this.$refs.wheel as WOFWheel).spin()
		}

		public landOnToken(token: Token) {
			WOFAudio.token()
			this.currentContestant.inventory.push(token)
		}

	}
</script>

<template>
	<div id="fake-wheel-of-fortune">
		<DisplayArea :screenCapture="false" id="fake-wheel-of-fortune-display-area">
			<WOFLogo v-if="view === 'logo'" />
			<WOFWheel
				v-if="view === 'wheel'"
				:contestants="contestants"
				:showTotals="showTotals"
				:current="current"
				:round="round"
				@setValue="setGuessValue($event)"
				@bankrupt="bankrupt()"
				@loseATurn="loseATurn()"
				@freeSpin="freeSpin()"
				@token="landOnToken($event)"
				ref="wheel"
			/>
			<WOFBoard
				v-if="view === 'board'"
				:clue="clue"
				:contestants="contestants"
				:showTotals="showTotals"
				:current="current"
				:round="round"
				:finalGuess="finalGuess"
				:animateBoard="animateBoard"
				@updateClue="clue = $event"
			/>
		</DisplayArea>
		<ControlBar class="contol-bar">

			<div>
				<h3>Volume: {{ volume * 100 }}%</h3>
				<input type="range" min="0" max="1" step="0.01" :value="volume" @change="setVolume" />
			</div>

			<h3 class="option-header">
				<span>View:</span>
				<select v-model="view">
					<option :value="'pre'">Pre</option>
					<option :value="'titles'">Titles</option>
					<option :value="'logo'">Logo</option>
					<option :value="'wheel'">Wheel</option>	
					<option :value="'board'">Board</option>	
				</select>
			</h3>

			<div>
				<h3>Contestants</h3>
				<div class="contestant header">
					<span class="name"></span>
					<span class="score">Score</span>
					<span class="total">Total</span>
				</div>
				<div v-for="(contestant, i) in contestants" :key="'contestant' + i">
					<div class="contestant" :class="{ current: i === current }">
						<span class="name"><input v-model="contestant.name" /></span>
						<span class="score"><input type="number" v-model="contestant.score" /></span>
						<span class="total"><input type="number" v-model="contestant.total" /></span>
					</div>
					<div class="inventory">
						<span v-for="(item, n) in contestant.inventory" :key="`item_${n}`" @click="useItem(i, n)">{{ item }}</span>
					</div>
				</div>

				<button @click="switchContestant(1)">Next</button>
				<button @click="switchContestant(-1)">Prev</button>
				<button @click="toggleShowTotals()">{{ showTotals ? 'Show Scores' : 'Score Totals' }}</button>
			</div>

			<div v-if="round !== RoundType.FINAL">
				<h3>Guess Value</h3>
				<p><input type="number" v-model="guessValue" /></p>
			</div>

			<div v-if="view === 'board'">
				<div v-if="round !== RoundType.FINAL">
					<h3>Consonants</h3>
					<p v-if="allConsonants">All Consonants Guessed!</p>
					<button
						v-for="char in consonants"
						class="letter-button"
						:key="char"
						:disabled="clue.guesses.has(char) || allConsonants"
						@click="letter(char)"
					>{{ char }}</button>

					<h3>Vowels</h3>
					<button
						v-for="char in vowels"
						class="letter-button"
						:key="char"
						:disabled="clue.guesses.has(char) || currentContestant.score < vowelCost"
						@click="buyVowel(char)"
					>{{ char }}</button>
				</div>

				<div v-if="round === RoundType.FINAL">
					<h3>Final Round</h3>
					<input v-model="finalGuess" />
					<button @click="submitFinalGuess()">Submit</button>
				</div>

				<h3>Actions</h3>
				<button @click="revealAll()">Reveal All</button>
				<button @click="hideAll()">Hide All</button>
			</div>

			<div v-if="view === 'wheel'">
				<h3>Actions</h3>
				<button @click="spin()">Spin</button>
				<button @click="addToken(Token.STAR_PRIZE)">Star Prize</button>
				<button @click="addToken(Token.PITCHERS_PRIZE)">Pitcher's Prize</button>
			</div>

			<h3>All Clues</h3>
			<div v-for="(c, i) in clues" :key="`clue_${i}`" class="clue" :class="{ current: i === clueNumber }" @click="setRound(i)">
				<i>Category: {{ c.category }}</i>
				<div>{{ c.original }}</div>
				<div><span class="label">{{ c.roundType }}</span></div>
			</div>
			<p><button @click="addClue()">Add Clue</button></p>

		</ControlBar>
		<ScriptBar>
			wheel of fortune
		</ScriptBar> 
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	button + button {
		margin-left: 0.25rem;
	}

	button.letter-button {
		& + & {
			margin: 0;
		}
	}

	#fake-wheel-of-fortune-display-area {
		cursor: none !important;
		background: grey;

	}

	.option-header {
		display: flex;
		span {
			flex-grow: 1;
		}
	}

	.contestant {
		display: flex;
		margin-bottom: 0.5rem;
		align-items: center;

		&.header {
			font-size: small;
			font-weight: bold;
			margin-bottom: 0.25rem;
		}

		&.current {
			outline: 1px solid yellow;
			outline-offset: 1px;
		}

		.name {
			flex-grow: 1;
			flex-shrink: 1;
			margin-right: 0.5rem;
		}
		.score,
		.total {
			width: 60px;
			margin-right: 0.5rem;
		}

		input {
			width: 100%;
		}
	}
	.inventory span {
		display: inline-block;
		padding: 0.1rem 0.5rem;
		border-radius: 0.25rem;
		background: #333;
		color: #FFF;
		margin: 0 0.25rem 0.5rem 0;
	}

	.clue {
		border: 1px solid white;
		padding: 0.5rem;
		padding-left: calc(0.5rem + 9px);
		margin-top: 0.5rem;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 0.25);
		}
		&.current {
			border-left-width: 10px;
			padding-left: calc(0.5rem);
		}
	}

	.label {
		display: inline-block;
		background: #333;
		color: #FFF;
		padding: 0.1rem 0.25rem;
		border-radius: 0.25rem;
		font-size: small;
		text-transform: uppercase;
		& + & {
			margin-left: 0.5rem;
		}
	}
</style>
