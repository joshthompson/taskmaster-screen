<script lang="ts">
	import PLAudio from '@/services/pl/PLAudio'
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Timer extends Vue {
		public timer: number = 60

		public created() {
			setTimeout(() => this.reduce(), 1000)
			PLAudio.ticking()
		}

		public destroyed() {
			PLAudio.stop()
		}

		private reduce() {
			this.timer--
			if (this.timer <= 0) {
				setTimeout(() => this.$emit('finished'), 1000)
			} else {
				setTimeout(() => this.reduce(), 1000)
			}
		}
	}
</script>

<template>
    <div class="timer" @click="$emit('finished')">
		<div>{{ timer }}</div>
		<svg><circle cx="50%" cy="50%" r="49%" /></svg>
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	$timer: 60s;

	.timer {
		position: absolute;
		top: s(3);
		right: s(3);

		width: s(20);
		height: s(20);
		text-align: center;
		font-size: s(12);
		line-height: s(19);
		font-weight: bold;

		cursor: pointer;

		background: #2B2B8E;

		border: s(0.5) solid #4D7AD5;
		box-shadow: inset 0 0 s(3) #00000077;
		border-radius: 50%;

		svg {
			position: absolute;
			top: s(-0.5);
			right: s(-0.5);
			width: s(20);
			height: s(20);
			transform: rotate(-90deg);

			circle {
				fill: none;
				stroke: #FFFFFF;
				stroke-width: s(0.6);
				stroke-dasharray: s(20 * 3.141592);
				stroke-dashoffset: s(-61.6);
				animation: rotate $timer linear;
			}

			@keyframes rotate {
				0% { stroke-dashoffset: 0; }
			}

		}
	}
</style>
