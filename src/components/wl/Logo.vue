<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Logo extends Vue {}
</script>

<template>
	<div class="logo"></div>
</template>

<style scoped lang="scss">
	@import '../../style/weakest-link.scss';

	.logo {
		position: absolute;
		bottom: $s5;
		right: $s5;
		background-image: url('../../assets/weakest-link/logo.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: $s15;
		height: $s15;
	}
</style>
