<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'
	import Scoreometer from '@/components/pl/Scoreometer.vue'

	@Component({
		components: { DisplayArea, ControlBar, ScriptBar, Scoreometer }
	})
	export default class FakePointless extends Vue {
		public double = !true
	}
</script>

<template>
	<div id="fake-pointless">
		<DisplayArea>
			<Scoreometer :type="double ? 'left' : 'standard'" />
			<Scoreometer v-if="double" type="right" />
		</DisplayArea>
		<ControlBar>
			<h3>Pointless</h3>
		</ControlBar>
		<ScriptBar />
	</div>
</template>

<style lang="scss">
	#fake-pointless {
		height: 100vh;
		width: 100vw;
		position: relative;
	}
</style>
