<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Timer extends Vue {
		public timer: number = 60
		public created() {
			setTimeout(() => this.reduce(), 1000)
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
		{{ timer }}
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	.timer {
		position: absolute;
		bottom: s(3);
		right: s(3);

		width: s(20);
		height: s(20);
		text-align: center;
		font-size: s(12);
		line-height: s(19);
		font-weight: bold;

		cursor: pointer;

		background: #2B2B8E;

		border: s(0.5) solid #FFFFFF;
		box-shadow: inset 0 0 s(3) #00000077;
		border-radius: 50%;
	}
</style>
