<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	
	import { Clue, ClueClass } from '@/types/WheelOfFortune'
	import { Contestant } from '@/FakeWheelOfFortune.vue'
	import WOFContestants from './WOFContestants.vue'

	@Component({
		components: { WOFContestants }
	})
	export default class WOFWheel extends Vue {

		@Prop({
			default: {
				original: '',
				category: '',
				letters: [],
				classes: []
			}
		}) public clue: Clue
		@Prop({ default: [] }) public contestants: Contestant[]
		@Prop({ default: 0 }) public current: number
		@Prop({ default: '' }) public finalGuess: string

		public consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
		public vowels = 'AEIOU'

		public reveal(i: number, j: number) {
			if (this.clue.classes[i][j] === ClueClass.found) {
				this.clue.classes[i][j] = ClueClass.letter
			}
			this.$emit('updateClue', this.clue)
		}

	}
</script>

<template>
	<div>
		<WOFContestants :contestants="contestants" :current="current" />
		<div class="board">
			<div class="rows">
				<div v-for="(row, i) in clue.classes" :key="'row_' + i" class="row">
					<div
						v-for="(charClass, j) in row"
						:key="'char_' + i + '_' + j"
						class="cell"
						:class="'char' + charClass"
						@click="reveal(i, j)"
					>
						<div class="tile">{{ charClass === 'O' ? clue.letters[i][j] : ''}}</div>
					</div>
				</div>
			</div>
			<div class="category">{{ clue.category }}</div>
			<div class="final-guess" v-if="finalGuess.length">{{ finalGuess }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	
	.board {

		$cell-size: 10.5;
		$border-size: $cell-size / 10;

		margin: s(10) auto;
		display: block;

		.rows {
			--fs: 2;
			--c1: #D0502C;
			--c2: #F5E95C;
			--c3: #5EC7EE;
			filter: drop-shadow(0 svar(var(--fs)) 0 var(--c1))
					drop-shadow(0 svar(calc(0 - var(--fs))) 0 var(--c1))
					drop-shadow(svar(var(--fs)) 0 0 var(--c1))
					drop-shadow(svar(calc(0 - var(--fs))) 0 0 var(--c1))

					drop-shadow(0 svar(var(--fs)) 0 var(--c2))
					drop-shadow(0 svar(calc(0 - var(--fs))) 0 var(--c2))
					drop-shadow(svar(var(--fs)) 0 0 var(--c2))
					drop-shadow(svar(calc(0 - var(--fs))) 0 0 var(--c2))

					drop-shadow(0 svar(var(--fs)) 0 var(--c3))
					drop-shadow(0 svar(calc(0 - var(--fs))) 0 var(--c3))
					drop-shadow(svar(var(--fs)) 0 0 var(--c3))
					drop-shadow(svar(calc(0 - var(--fs))) 0 0 var(--c3));
		}

		&.animate {
			.rows {
				animation: winner 1s linear infinite;
			}
			@keyframes winner {
				0% { --c1: #D0502C; --c2: #F5E95C; --c3: #5EC7EE; }
				33% { --c1: #5EC7EE; --c2: #D0502C; --c3: #F5E95C; }
				67% { --c1: #F5E95C; --c2: #5EC7EE; --c3: #D0502C; }
			}
		}

		.row {
			display: block;

			.cell {
				display: inline-block;
				width: s($cell-size);
				height: s($cell-size);
				vertical-align: top;
				background: #000000;

				&.char_ {
					visibility: hidden;
				}

				&.char- .tile {
					background: #1F4E7E;
				}

				&.charH .tile {
					background: #FFFFFF;
					cursor: pointer;
				}

				&.charO .tile {
					background: #FFFFFF;
					animation: 1s spin ease-in-out;
				}
				
				.tile {
					width: s($cell-size + $border-size);
					height: s($cell-size + $border-size);

					background: #CCCCCC;
					border: s($border-size) solid black;
					font-size: s($cell-size * 0.7);
					font-weight: bold;
					line-height: s($cell-size * 0.85);
					color: #347FD3;
					text-transform: uppercase;
				}

			}
		}

		.category,
		.final-guess {
			text-transform: uppercase;
			font-family: 'Courier New', Courier, monospace;
			color: #E0C23B;
			font-size: s(10);
			font-weight: bold;
			text-shadow: s(0.5) s(0.5) 0 #000000;
			margin-top: s(6.5);
		}

		.final-guess {
			margin-top: s(-2);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate3d(0, 1, 0, -180deg);
			color: #FFFFFF;
		}
		49.999% {
			color: #FFFFFF;
		}
		50% {
			color: #347FD3;
		}
		100% {
			transform: rotate3d(0, 1, 0, 0deg);
		}
	}

</style>


