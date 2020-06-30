<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import CircleOverlay from '@/components/pl/CircleOverlay.vue'
	
	@Component({
		components: { CircleOverlay }
	})
	export default class Slides extends Vue {}
</script>

<template>
	<CircleOverlay class="slides">
		<transition name="slide">
			<slot />
		</transition>
	</CircleOverlay>
</template>

<style lang="scss">
	@import '@/style/sizing.scss';
	.slides {
		width: $width;
		height: $height;
		background: radial-gradient(circle, rgb(79, 50, 223) 20%, rgb(7, 30, 180) 80%, rgb(1, 20, 148) 100%);
		text-align: center;
		.slide {
			position: absolute;
			top: 0;
			left: 0;
			width: $width;
			height: $height;
			padding-top: s(50);
			cursor: pointer;
		}
	}
	.slide-enter-active {
		transition: all 0.5s ease-in-out;
	}
	.slide-leave-active {
		transition: all 0.5s ease-in-out;
	}
	.slide-enter {
		transform: rotate3d(0, 1, 0, 90deg) translateX(100%) scaleX(0);
		opacity: 0;
	}
	.slide-leave-to {
		transform: rotate3d(0, 1, 0, -90deg) translateX(-100%) scaleX(0);
		opacity: 0;
	}
</style>
