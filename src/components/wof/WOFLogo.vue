<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class WOFLogo extends Vue {}
</script>

<template>
	<div class="wof-logo">
		<img src="../../assets/wheel-of-fortune/logo.png" />
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.wof-logo {
		height: $height;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #014EAD;

		img {
			width: s(70);
		}
	}
</style>


