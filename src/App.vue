<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import FakeTaskmaster from './FakeTaskmaster.vue'
	import FakeWeakestLink from './FakeWeakestLink.vue'
	import FakePointless from './FakePointless.vue'
	import FakeWheelOfFortune from './FakeWheelOfFortune.vue'

	@Component({
		components: { FakeTaskmaster, FakeWeakestLink, FakePointless, FakeWheelOfFortune }
	})
	export default class App extends Vue {
		public started: boolean = false
		public game: 'taskmaster' | 'weakest-link' | 'pointless' | 'wheel-of-fortune' = null
		
		public created() {
			// this.setGame('wheel-of-fortune'
		}

		public setGame(game: 'taskmaster' | 'weakest-link' | 'pointless' | 'wheel-of-fortune') {
			window.document.title = game.toUpperCase()
			this.game = game
		}
	}
</script>

<template>
	<div id="app" :class="{ started: game !== null }">
		<div class="actions">
			<h1 v-if="!game">Select Game</h1>
			<a v-if="!game" @click="setGame('taskmaster')" class="taskmaster">
				Taskmaster
			</a>
			<a v-if="!game" @click="setGame('weakest-link')" class="weakest-link">
				<img src="./assets/weakest-link/logo.png" />
			</a>
			<a v-if="!game" @click="setGame('pointless')" class="pointless">
				<img src="./assets/pointless/logo.png" />
			</a>
			<!-- <a v-if="!game" @click="setGame('wheel-of-fortune')" class="wheel-of-fortune">
				<img src="./assets/wheel-of-fortune/logo.png" />
			</a> -->
		</div>
		<FakeTaskmaster v-if="game === 'taskmaster'" />
		<FakeWeakestLink v-if="game === 'weakest-link'" />
		<FakePointless v-if="game === 'pointless'" />
		<FakeWheelOfFortune v-if="game === 'wheel-of-fortune'" />
	</div>
</template>

<style lang="scss">
	@import '@/style/app.scss';
	#app > .actions {

		h1 {
			color: #000000;
		}
		
		a {

			$size: 300px;

			display: inline-block;
			font-size: 1.5rem;
			border-radius: 0rem;
			color: #FFFFFF;
			background: #008DD4;
			margin: 1rem 1rem;
			height: $size;
			width: $size;
			line-height: $size;
			text-align: center;
			cursor: pointer;
			vertical-align: top;
			filter: brightness(1);
			transition: all 0.2s ease-in-out;

			img {
				width: 80%;
				vertical-align: middle;
			}

			&.taskmaster {
				font-family: 'Veteran-Typewriter';
				background: black;
				font-size: 3rem;
			}

			&.weakest-link {
				background: #296488;
			}

			&.pointless {
				background: #1E0A37;
			}

			&:hover {
				filter: brightness(1.1);
				transform: scale(1.1);
			}
		}
	}
</style>
