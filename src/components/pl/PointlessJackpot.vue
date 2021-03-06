<script lang="ts">
	import { PLState, PointlessGame } from '@/types/Pointless'
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import Slides from '@/components/pl/Slides.vue'
	import PLAudio from '@/services/pl/PLAudio'
	
	@Component({
		components: { Slides }
	})
	export default class PointlessJackpot extends Vue {
		@Prop() public game: PointlessGame
		public get jackpot() { return (this.$store.state.pl as PLState).jackpot }
		public created() {
			PLAudio.pointless()
		}
	}
</script>s

<template>
	<div @click="$emit('finished')">
		<Slides>
			<div class="slide">
				<div class="block">{{ jackpot }} {{ game.jackpotName }}*</div>
				<div class="star">*£1 Scratch Cards</div>
			</div>
		</Slides>
		<!-- <video src="/pointless/video/trophy.mp4" autoplay></video> -->
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	video {
		width: 0;
		height: 0;
	}

	.slide {
		text-align: center;
	}

	.block {
		display: inline-flex;
		background: linear-gradient(20deg, rgb(70, 33, 180) 30%, rgb(50, 43, 184) 50%, rgba(32,26,171,1) 61%, rgba(41,31,179,1) 62%, rgb(86, 49, 199) 100%);
		box-shadow: inset 0 0 s(5) rgb(0, 0, 0, 0.5);
		border: s(0.5) solid #FFFFFF;
		width: s(140);
		min-height: s(40);
		border-radius: s(20);
		padding: s(1) s(3);
		line-height: s(9);
		font-size: s(10);
		font-weight: bold;
		text-transform: uppercase;
		flex-direction: column;
		justify-content: center;
		height: auto;
		transform: translateY(-50%);
		animation: appear 1s ease-in-out;
	}

	.star {
		font-size: s(4);
	}

	@keyframes appear {
		0% { opacity: 0; transform: rotate3d(1, 1, 1, 90deg) translateY(-50%) translateX(-25%); }
		100% { opacity: 1; transform: translateY(-50%); }
	}
</style>
