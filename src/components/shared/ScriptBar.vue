<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class ScriptBar extends Vue {}
</script>

<template>
	<div class="script-bar">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	
	.script-bar {
		$textSize: 1.5rem;
		position: absolute;
		bottom: 0;
		left: 0;
		width: $width;
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