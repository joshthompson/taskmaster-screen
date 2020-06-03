<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import FakeTaskmaster from './FakeTaskmaster.vue'
	import FakeWeakestLink from './FakeWeakestLink.vue'
	import FakePointless from './FakePointless.vue'

	@Component({
		components: { FakeTaskmaster, FakeWeakestLink, FakePointless }
	})
	export default class App extends Vue {
		public started: boolean = false
		public game: 'taskmaster' | 'weakest-link' | 'pointless' = null
	}
</script>

<template>
	<div id="app" :class="{ started: game !== null }">
		<div class="actions">
			<a v-if="!game" @click="game = 'taskmaster'">Start Taskmaster</a>
			<a v-if="!game" @click="game = 'weakest-link'">Start Weakest Link</a>
			<a v-if="!game" @click="game = 'pointless'">Start Pointless</a>
		</div>
		<FakeTaskmaster v-if="game === 'taskmaster'" />
		<FakeWeakestLink v-if="game === 'weakest-link'" />
		<FakePointless v-if="game === 'pointless'" />
	</div>
</template>

<style lang="scss">
	@import './style/app.scss';

	#app > .actions a {
		display: block;
		padding: 2rem 10rem;
		font-size: 1.5rem;
		border-radius: 0rem;
		color: #FFFFFF;
		background: #008DD4;
		margin: 1rem 1rem;
		cursor: pointer;
	}
</style>
