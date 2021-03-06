<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import WOFBoard from '@/components/wof/WOFBoard.vue'
	import WOFAudio from '@/services/wof/WOFAudio'

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
			WOFBoard
		}
	})
	export default class FakeWheelOfFortune extends Vue {

		public clue: Clue = this.createClue('')

		public created() {
			// this.createClue('IN THE TWINKLING OF AN EYE', 'Phrases')
			this.clue = this.createClue('Well done to be players I guess', 'Cool things to say')
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
			this.clue = { ...this.clue }
		}


		public letter(letter: string, delay = foundDelay) {
			letter = letter.substr(0, 1)
			const found: [number, number][] = []
			this.clue.guesses.add(letter[0])
			this.clue.letters.forEach((row, i) => {
				row.forEach((tile, j) => {
					if (tile.toUpperCase() === letter.toUpperCase()) {
						found.push([i, j])
					}
				})
			})
			found.forEach(([i, j], n) => {
				setTimeout(() => {
					this.clue.classes[i][j] = ClueClass.found
					WOFAudio.bing()
					this.clue = { ...this.clue }
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

	}
</script>

<template>
	<div id="fake-wheel-of-fortune">
		<DisplayArea :screenCapture="false" id="fake-wheel-of-fortune">
			<WOFBoard :clue="clue" @updateClue="clue = $event" />
		</DisplayArea>
		<ControlBar class="contol-bar">

			<h3>Clue</h3>
			<p>{{ clue.original.toUpperCase() }}</p>

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
</style>
