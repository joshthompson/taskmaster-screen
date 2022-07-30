<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	interface Portrait {
		name: string
		image: string
		rotate?: boolean
	}

	@Component
	export default class Portraits extends Vue {
		@Prop() public portraits: Portrait[]
	}
</script>

<template>
	<div class="portraits">
		<div
			v-for="(portrait, i) in portraits"
			:key="i"
			:style="{ backgroundImage: `url(${portrait.image})` }"
			:class="{
				portrait: true,
				small: portraits.length > 1,
				big: portraits.length <= 1,
				rotate: portrait.rotate
			}"
		>
			<div class="frame" />
			<div class="plaque">{{ portrait.name }}</div> 
		</div>
	</div>
</template>

<style scoped lang="scss">
	.portraits {
		background-image: url('../../assets/taskmaster/logo-bg.jpg');
		background-size: cover;
		background-position: center;
		width: 100vw;
		height: 100vh;
		padding: 1rem 16rem;

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
		justify-content: center;

		.portrait {
			background-size: 65% 69%;
			background-position: center;
			background-repeat: no-repeat;
			width: 0.8em;
			height: 1em;
			position: relative;
			margin: 0.01em;
			user-select: none;

			&.big {
				font-size: 90vh;
			}

			&.small {
				font-size: 46vh;
			}

			.frame {
				width: 100%;
				height: 100%;
				background-image: url('../../assets/taskmaster/frame.png');
				background-size: 100% 100%;
			}

			&.rotate {
				width: 1em;
				height: 0.8em;
				background-size: 74% 67%;
				.frame {
					background-image: url('../../assets/taskmaster/frame-landscape.png');
				}
				.plaque {
					transform: translate(-50%, 10%);
				}
			}

			.plaque {
				font-family: "Baskerville";
				color: black;
				position: absolute;
				bottom: 5.5%;
				left: 48.5%;
				transform: translateX(-50%);
				text-shadow: -0.03em 0 0.01em rgb(0 0 0 / 25%), 0.03em 0 0.01em rgb(255 255 255 / 25%);
				font-size: 0.08em;
				text-transform: uppercase;
			}
		}
		// img {
		// 	max-height: calc(100vh - 4rem);
		// 	max-width: calc(100vw - 4rem);
		// 	transform: translateY(-50%);
		// }
	}
</style>
