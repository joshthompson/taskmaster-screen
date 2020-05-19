<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	import { getState } from './services/data'
	
	import DisplayArea from '@/components/wl/DisplayArea.vue'
	import InfoBar from '@/components/wl/InfoBar.vue'
	import ScriptBar from '@/components/wl/ScriptBar.vue'

	@Component({
		components: { DisplayArea, InfoBar, ScriptBar }
	})
	export default class FakeWeakestLink extends Vue {}
</script>

<template>
	<div id="fake-weakest-link">
		<DisplayArea />
		<InfoBar />
		<ScriptBar />
	</div>
</template>

<style lang="scss">
	@import './style/weakest-link.scss';
	#fake-weakest-link {
		height: 100vh;
		width: 100vw;
		position: relative;

		.btn {
			border: 0;
			display: inline-block;
			background: #FFFFFF;
			color: #000000;
			text-transform: uppercase;
			padding: 0.5em 1em;
			margin: 0.5em;
			border-radius: 0.5em;
			cursor: pointer;

			&.large {
				font-size: 1.5rem;
			}
		}
	}
</style>
