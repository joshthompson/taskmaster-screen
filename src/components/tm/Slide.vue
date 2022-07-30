<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class Slide extends Vue {
		@Prop() public slide: string
	}
</script>

<template>
	<div class="slide">
		<img :src="slide" />
	</div>
</template>

<style scoped lang="scss">
	.slide {
		background-image: url('../../assets/taskmaster/logo-bg.jpg');
		background-size: cover;
		background-position: center;
		width: 100vw;
		height: 100vh;
		padding: 50vh 2rem 0;
		img {
			max-height: calc(100vh - 4rem);
			max-width: calc(100vw - 4rem);
			transform: translateY(-50%);
		}
	}
</style>
