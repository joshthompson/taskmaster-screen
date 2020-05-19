<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class RoundTimer extends Vue {
		@Prop() private time: number

		public get timer() {
			const mins = Math.floor(this.time / 60)
			const secs = Math.floor(this.time % 60)
			return `${mins}:${secs < 10 ? `0${secs}` : secs}`
		}
	}
</script>

<template>
	<div class="timer">
		{{ timer }}
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/weakest-link.scss';

	.timer {
		position: absolute;
		bottom: $s5;
		right: $s5;
		background-image: url('../../assets/weakest-link/Clock.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: $s25;
		height: $s15;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: $s5;
		line-height: $s15;
	}
</style>
