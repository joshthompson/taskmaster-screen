<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import PLAudio from '@/services/pl/PLAudio'
	import Logo from '@/components/pl/Logo.vue'

	@Component({
		components: { Logo }
	})
	export default class ChangeRound extends Vue {
		@Prop() public round: number

		public created() {
			PLAudio.flick()
			setTimeout(() => this.$emit('finished'), 2500)
		}
	}
</script>

<template>
    <div class="change-round pointless-logo">
		<Logo :extra="round === 3 ? 'Final' : null" />
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	.change-round {
		position: absolute;
		top: s(50);
		left: s(50 * 16/9);
		opacity: 0;
		animation: pow 2.5s ease-out;
		font-size: s(5);
		font-weight: bold;
		text-transform: uppercase;

		// animation: none;
		// transform: translateX(-50%) translateY(-50%) scale(6) rotate(2deg);
		// opacity: 1;
	}

	@keyframes pow {
		0% {
			transform: translateX(-50%) translateY(-50%) scale(0.01) rotate(-10deg);
			opacity: 1;
		}
		90% {
			transform: translateX(-50%) translateY(-50%) scale(6) rotate(2deg);
		}
		100% {
			transform: translateX(-50%) translateY(-50%) scale(0) rotate(3deg);
			opacity: 1;
		}
	}
</style>
