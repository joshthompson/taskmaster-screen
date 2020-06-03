<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class DisplayArea extends Vue {}
</script>

<template>
	<div class="display-area">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/sizing.scss';

	.display-area {
		position: relative;
		width: $width;
		height: $height;
		margin: 0;
		background-color: #00FF00;
		user-select: none;
		overflow: hidden;
	}
</style>
