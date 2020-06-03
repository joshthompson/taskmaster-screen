<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class ControlBar extends Vue {}
</script>

<template>
	<div class="control-bar">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/sizing.scss';

	.control-bar {
		position: absolute;
		z-index: 100;
		top: 0;
		right: 0;
		width: calc(100vw - #{$width});
		height: 100vh;
		background: #444444;
		color: #FFFFFF;
		padding: 1rem;
		overflow: auto;

		h2 {
			margin: 0 0 1rem;
		}
	}
</style>
