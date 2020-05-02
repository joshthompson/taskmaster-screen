<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Scores extends Vue {}
</script>

<template>
	<div class="logo">
		<div class="text">
			<div class="line-one">Fake</div>
			<div class="line-two">Taskmaster</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.logo {
		width: 100vw;
		height: 100vh;
		background: #FFFFFF;
		color: #000000;

		.text {
			display: inline-block;
			font-size: 10rem;
			margin-top: 50vh;
			text-transform: uppercase;
			transform: translateY(-50%);
			.line-one {
				font-size: 0.65em;
			}
		}
	}
</style>
