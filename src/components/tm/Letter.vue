<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class Letter extends Vue {
		@Prop() public letter: string
	}
</script>

<template>
	<div class="letter">
		<div>{{ letter }}</div>
	</div>
</template>

<style scoped lang="scss">
	.letter {
		background-image: url('../../assets/slide-bg.jpg');
		background-size: cover;
		background-position: center;
		width: 100vw;
		height: 100vh;
		padding: 50vh 2rem 0;
		div {
			font-size: 32rem;
            text-transform: uppercase;
            color: #000000;
			transform: translateY(-50%);
		}
	}
</style>
