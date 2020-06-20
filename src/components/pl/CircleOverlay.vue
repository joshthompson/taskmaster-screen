<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class CircleOverlay extends Vue {}
</script>

<template>
    <div class="circle-overlay">
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="content"><slot /></div>
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.circle-overlay {
		position: relative;
		overflow: hidden;
	}

	.content {
		position: relative;
		z-index: 2;
	}

	.circle {
		$time: 15s;

		position: absolute;
		background: none;
		border-radius: 50%;
		animation: rotate $time linear infinite;
		z-index: 1;

		&:nth-child(1) {
			box-shadow: s(-1) s(-1) s(1) rgba(255, 255, 255, 0.25);
			width: s(200);
			height: s(200);
			top: s(-30);
			left: s(-30);
		}

		&:nth-child(2) {
			box-shadow: s(-0.5) s(-1) s(1) rgba(255, 255, 255, 0.25);
			width: s(300);
			height: s(300);
			top: s(-10);
			left: s(-50);
			animation-delay: -$time * 1/3;
			animation-duration: $time * 0.8;
		}

		&:nth-child(3) {
			box-shadow: s(-1) s(-0.5) s(1) rgba(255, 255, 255, 0.25);
			width: s(180);
			height: s(180);
			top: s(-60);
			left: s(0);
			animation-delay: -$time * 2/3;
			animation-duration: $time * 1.2;
		}
	}

	@keyframes rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

</style>
