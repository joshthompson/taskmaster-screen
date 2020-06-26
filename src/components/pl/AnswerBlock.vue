<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessAnswer, PointlessBoardAnswer } from '@/types/Pointless'

	@Component
	export default class AnswerBlock extends Vue {
		@Prop() public answer: PointlessAnswer
		@Prop({ default: 'medium' }) public size: 'large' | 'medium' | 'small'
		@Prop({ default: false }) public selected: boolean
		@Prop({ default: false }) public showHint: boolean
		@Prop({ default: false }) public hideAnswer: boolean
		@Prop({ default: false }) public showImage: boolean

		public get image() {
			return this.showImage && (this.answer as PointlessBoardAnswer).image ? true : false
		}
	}
</script>

<template>
	<div :class="{ image, selected }" @click="$emit('selected', answer)">
		<img v-if="image" :src="answer.image" />
		<a class="answer-block" :class="{ hideAnswer, showHint, wrong: !answer, [size]: true }">
			<div v-if="!answer" class="cross"><span class="text">✘</span></div>
			<div v-if="answer" class="answer"><span class="text" v-html="answer.answer"></span></div>
			<div v-if="answer" class="score"><span class="text">{{ answer.score }}</span></div>
			<div v-if="showHint && !image" class="hint"><span class="text" v-html="answer.hint"></span></div>
		</a>
	</div>
</template>

<style lang="scss">
	@import '@/style/sizing.scss';

	.answer-block {
		display: flex;
		width: 100%;
		overflow: hidden;

		.lc {
			text-transform: lowercase;
		}

		&.showHint {
			flex-direction: row-reverse;
		}

		&.hideAnswer {
			.score, .answer {
				.text {
					opacity: 0;
				}
			}
		}

		&.small {
			font-size: s(4);
		}

		&.medium {
			font-size: s(6);
		}

		&.large {
			font-size: s(6);
			
			height: 1.6em;

			.hint, .answer {
				padding: 0.3em;
			}
			
			.score {
				padding: 0.3em;
				height: 1.6em;
				width: 1.6em;
				min-width: 1.6em;
			}

			.text {
				margin-top: 0.8em;
			}
		}

		.text {
			margin-top: 0.7em;
			display: block;
			font-size: 0.6em;
			transform: translateY(-50%);
			opacity: 1;
			transition: opacity 0.2s ease-out;
		}

		border-radius: 10em;
		height: 1em;
		line-height: 0.6em;
		text-align: center;

		border: s(0.3) solid #FFFFFF;
		background: linear-gradient(
			0deg,
		   rgba(107,22,154,1) 5%,
		   rgba(121,43,175,1) 16%,
		   rgba(128,53,186,1) 29%,
		   rgba(107,45,168,1) 45%,
		   rgba(6,5,80,1) 88%
		);
		background: linear-gradient(
			180deg,
			rgba(30,25,138,1) 0%,
			rgba(55,49,180,1) 10%,
			rgba(30,25,138,1) 20%,
			rgba(30,25,138,1) 40%,
			rgba(57,26,148,1) 60%,
			rgba(82,53,169,1) 80%
		);
			
		margin: s(1) 0;
		text-transform: uppercase;
		font-weight: bold;
		text-shadow: 0 0 s(0.25) rgba(0, 0, 0, 0.5);
		box-shadow: inset 0 0 s(1) rgba(6, 5, 80, 1);
		cursor: pointer;
		transition: filter 0.3s ease-in, box-shadow 0.3s ease-in;

		&.wrong {
			filter: hue-rotate(90deg);
			.selected & {
				filter: hue-rotate(90deg) brightness(1.25);
			}
		}

		.selected & {
			box-shadow: inset 0 0 s(1) rgba(6, 5, 80, 1), 0 0 s(2) #FFFFFF;
			filter: brightness(1.25);
		}

		.cross {
			flex-grow: 1;
			text-align: center;
		}
		
		.answer {
			flex-grow: 1;
		}

		.hint {
			width: 70%;
			flex-grow: 0;
			flex-shrink: 0;
		}

		.score {
			background: linear-gradient(0deg, rgba(73,37,149,1) 0%, rgba(6,5,61,1) 100%);
			box-shadow: inset 0 0 s(1) rgba(0, 0, 0, 0.5);
			margin: s(-0.3) s(-0.3) 0 0;
			border: s(0.3) solid #FFFFFF;
			border-radius: 50%;
			width: 1em;
			height: 1em;
			min-width: 1em;
			position: relative;
			z-index: 10;
		}
	}

	.image {
		display: inline-block;
		width: s(30 * 16/9);
		min-height: s(40);
		height: s(40);
		border-radius: s(5);
		img {
			width: s(30 * 16/9);
			height: s(30);
			border-radius: s(5);
			border: s(0.3) solid #FFFFFF;
			margin-bottom: 0;
			transition: filter 0.3s ease-in, box-shadow 0.3s ease-in;
		}

		&.selected img {
			box-shadow: 0 0 s(2) #FFFFFF;
			filter: brightness(1.25);
		}

		.answer-block.showHint {
			flex-direction: row;
		}
	}
</style>
