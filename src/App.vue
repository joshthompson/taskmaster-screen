<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import FakeTaskmaster from './FakeTaskmaster.vue'
	import FakeWeakestLink from './FakeWeakestLink.vue'

	@Component({
		components: { FakeTaskmaster, FakeWeakestLink}
	})
	export default class App extends Vue {
		public started: boolean = false
		public get taskmaster() {
			return false
		}
		public get weakestLink() {
			return true
		}
	}
</script>

<template>
	<div id="app" :class="{ started }">
		<a v-if="!started" @click="started = true">START</a>
		<FakeTaskmaster v-if="started && taskmaster" />
		<FakeWeakestLink v-if="started && weakestLink" />
	</div>
</template>

<style lang="scss">
	@import './style/app.scss';

	#app.started {
		// cursor: none;
	}

	#app > a {
		display: inline-block;
		padding: 2rem 10rem;
		font-size: 1.5rem;
		border-radius: 0rem;
		color: #FFFFFF;
		background: #008DD4;
		margin-top: 50vh;
		transform: translateY(-50%);
		cursor: pointer;
	}
</style>
