<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { WLState } from '@/types/WeakestLink'

	@Component
	export default class ScriptBar extends Vue {
		public get script() {
			return (this.$store.state.wl as WLState).script
		}
	}
</script>

<template>
	<div class="script-bar" v-html="script"></div>
</template>

<style lang="scss" scoped>
	@import '../../style/weakest-link.scss';
	
	.script-bar {
		$textSize: calc((100vh - #{$height}) / 5);
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: calc(100vh - #{$height});
		background: #000000;
		color: #FFFFFF;
		padding: 1rem;
		text-align: center;
		line-height: $textSize;
		font-size: $textSize;
		overflow: auto;
	}
</style>

<style lang="scss">
	.script-bar .answer {
		margin-top: 0.5rem;
		color: #008DD4;
	}
</style>
