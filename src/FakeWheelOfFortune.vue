<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import OBSWebSocket from 'obs-websocket-js'

	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import WOFBoard from '@/components/wof/WOFBoard.vue'
	import WOFWheel from '@/components/wof/WOFWheel.vue'
	import WOFLogo from '@/components/wof/WOFLogo.vue'
	import WOFAudio from '@/services/wof/WOFAudio'
	import OBS from '@/services/shared/OBS'

	interface Clue {
		original: string
		category: string
		guesses: Set<string>
		letters: string[][]
		classes: ClueClass[][]
	}

	enum ClueClass {
		void = '_',
		blank = '-',
		hidden = 'X',
		found = 'H',
		letter = 'O',
		star = 'S'
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
		public view: 'board' | 'wheel' | 'logo' = 'logo'

		public clues: Clue[] = [
			this.createClue('In the twinkling of an eye', 'Phrases'),
			this.createClue('I like big butts and I cannot lie', 'Song lyrics'),
			this.createClue('The Great Pyramids of Giza', 'Famous Places'),
			this.createClue('In for a penny, in for a pound', 'Phrases'),
			this.createClue('Call the Midwife', 'TV Show'),
			this.createClue('Ed Sheeran Shape Of You', 'Singer/Song'),
			this.createClue('Fifty Shades Of Grey', 'Book'),
			this.createClue('Lewis Hamilton', 'Sporting Greats'),
		]
		public clueNumber = 0
		public clue = this.clues[this.clueNumber]
		public finalGuess = ''
		
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
			
		}

		public consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
		public vowels = 'AEIOU'

		private createClue(clue: string, category: string = null, maxLineLength = maxLength) {
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
				classes: this.tiles()
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
			this.revealFound(fastReveal)
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

		public setClue(number: number) {
			this.clues[this.clueNumber] = this.clue
			this.clueNumber = number
			this.clue = this.clues[this.clueNumber]
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
					this.currentContestant.score += parseInt(this.guessValue.toString())
				}, delay * n)
			})
			setTimeout(() => this.revealFound(), delay * found.length)
			this.clue = { ...this.clue }
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

		private get currentContestant() {
			return this.contestants[this.current]
		}

		public addContestant() {
			this.contestants = [
				...this.contestants,
				{ name: prompt('Name'), score: 0, total: 0, inventory: [] }
			]
		}

		public removeContestant(i: number) {
			this.contestants = this.contestants.filter((_, j) => j !== i)
			this.switchContestant(0)
		}

		public switchContestant(n: number) {
			this.current += this.contestants.length * 100 + n
			this.current %= this.contestants.length
		}

		public bankrupt() {
			this.currentContestant.score = 0
			this.switchContestant(1)
		}

		public loseATurn() {
			this.switchContestant(1)
		}

		public freeSpin() {
			this.currentContestant.inventory.push(InventoryItems.FREE_SPIN)
		}

		public setGuessValue(value: number) {
			this.guessValue = value
		}

	}
</script>

<template>
	<div id="fake-wheel-of-fortune">
		<DisplayArea :screenCapture="false" id="fake-wheel-of-fortune">
			<WOFLogo v-if="view === 'logo'" />
			<WOFWheel
				v-if="view === 'wheel'"
				:contestants="contestants"
				:current="current"
				@setValue="setGuessValue($event)"
				@bankrupt="bankrupt()"
				@loseATurn="loseATurn()"
				@freeSpin="freeSpin()"
			/>
			<WOFBoard
				v-if="view === 'board'"
				:clue="clue"
				:contestants="contestants"
				:current="current"
				:finalGuess="finalGuess"
				@updateClue="clue = $event"
			/>
		</DisplayArea>
		<ControlBar class="contol-bar">

			<h3>View</h3>
			<button @click="view = 'logo'">Logo</button>	
			<button @click="view = 'wheel'">Wheel</button>	
			<button @click="view = 'board'">Board</button>	

			<div>
				<h3>Contestants</h3>

				<div v-for="(contestant, i) in contestants" :key="'contestant' + i">
					<div class="contestant" :class="{ current: i === current }">
						<span class="name">{{ contestant.name }}</span>
						<span class="score"><input v-model="contestant.score" /></span>
						<button @click="removeContestant(i)">x</button>
					</div>
					<div class="inventory">
						<span v-for="(item, n) in contestant.inventory" :key="`item_${n}`">{{ item }}</span>
					</div>
				</div>

				<button @click="addContestant()">Add Contestant</button>
				<button @click="switchContestant(1)">Next</button>
				<button @click="switchContestant(-1)">Prev</button>
			</div>

			<h3>All Clues</h3>
			<div v-for="(c, i) in clues" :key="`clue_${i}`" class="clue" :class="{ current: i === clueNumber }" @click="setClue(i)">
				<i>Category: {{ c.category }}</i>
				<div>{{ c.original }}</div>
			</div>

			<h3>Guess Value</h3>
			<p><input type="number" v-model="guessValue" /></p>

			<div v-if="view === 'board'">
				<h3>Consonants</h3>
				<button
					v-for="char in consonants"
					:key="char"
					:disabled="clue.guesses.has(char)"
					@click="letter(char)"
				>{{ char }}</button>

				<h3>Vowels</h3>
				<button
					v-for="char in vowels"
					:key="char"
					:disabled="clue.guesses.has(char)"
					@click="letter(char)"
				>{{ char }}</button>

				<h3>Actions</h3>
				<button @click="revealAll()">Reveal All</button>
				<button @click="hideAll()">Hide All</button>

				<h3>Final Round</h3>
				<input v-model="finalGuess" />
				<button @click="submitFinalGuess()">Submit</button>
			</div>

		</ControlBar>
		<ScriptBar>
			wheel of fortune
		</ScriptBar> 
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	#fake-wheel-of-fortune {
		background: grey;
	}

	.contestant {
		display: flex;
		padding-bottom: 0.5rem;
		align-items: center;

		&.current:before {
			content: "≫ ";
			margin-right: 0.25rem;
		}

		.name {
			flex-grow: 1;
		}
		.score {
			margin-right: 0.5rem;
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
</style>
