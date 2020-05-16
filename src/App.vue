<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import FakeTaskmaster from './FakeTaskmaster.vue'
	import FakeWeakestLink from './FakeWeakestLink.vue'

	@Component({
		components: { FakeTaskmaster, FakeWeakestLink }
	})
	export default class App extends Vue {
		public started: boolean = false
		public game: 'taskmaster' | 'weakest-link' = null
		public get taskmaster() {
			return this.game === 'taskmaster'
		}
		public get weakestLink() {
			return this.game === 'weakest-link'
		}
	}
</script>

<template>
	<div id="app" :class="{ started: game !== null }">
		<a v-if="!game" @click="game = 'taskmaster'">Start Taskmaster</a>
		<a v-if="!game" @click="game = 'weakest-link'">Start Weakest Link</a>
		<FakeTaskmaster v-if="taskmaster" />
		<FakeWeakestLink v-if="weakestLink" />
	</div>
</template>

<style lang="scss">
	@import './style/app.scss';

	// #app.started {
	// 	cursor: none;
	// }

	#app > a {
		display: inline-block;
		padding: 2rem 10rem;
		font-size: 1.5rem;
		border-radius: 0rem;
		color: #FFFFFF;
		background: #008DD4;
		margin: 50vh 1rem 0;
		transform: translateY(-50%);
		cursor: pointer;
	}
</style>
