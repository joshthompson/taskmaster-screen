<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Logo extends Vue {}
</script>

<template>
	<div class="logo"></div>
</template>

<style scoped lang="scss">
	@import '../../style/sizing.scss';

	.logo {
		position: absolute;
		bottom: 0;
		right: 0;
		background-image: url('../../assets/weakest-link/logo-new.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: $s25;
		height: $s25;
	}
</style>
