<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessTeam, PointlessGame } from '@/types/Pointless'
	import { scoreToBeat, potentialMax } from '@/services/pl/data'

	@Component
	export default class TeamScore extends Vue {
		@Prop() public game: PointlessGame
		@Prop() public team: PointlessTeam
		@Prop({ default: 'none' }) public mode: string

		public get out() {
			const score = scoreToBeat(this.team)
			const max = potentialMax(this.team)
			if (score !== null) {
				return score < 0 && this.team.answers === 2
					|| max < this.team.score
			}
			return false
		}

		public get scoreString(): string | number {
			return this.team.score === null ? 'Pointless' : this.team.score
		}

		public get pos() {
			return this.game.teams
				.filter((t) => !t.out)
				.findIndex((t) => t === this.team)
		}

		public get headToHead() {
			return this.game.currentRound === 2
		}

		public get classes() {
			return {
				[this.mode]: true,
				logo: this.scoreString === 'Pointless',
				out: this.out,
				headToHead: this.headToHead
			}
		}

		public get h2h() { return this.team.headToHeadScore }
		public set h2h(score: number) {
			this.team.headToHeadScore = score !== this.h2h ? score : 0
		}

	}
</script>

<template>
	<div>
		<div class="team-score" :class="classes" :pos="pos">
			<div v-if="!headToHead" class="inner">{{ scoreString }}</div>
			<div v-if="headToHead" class="head-to-head">
				<div class="circle" :class="{ filled: h2h >= 1 }" @click="h2h = 1"><div></div></div>
				<div class="circle" :class="{ filled: h2h >= 2 }" @click="h2h = 2"><div></div></div>
			</div>
			<div class="name">{{ team.name }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.team-score {

		display: inline-block;
		user-select: none;
		z-index: 2;

		$size: 30;
		$border: 2;
		$textSize: $size * 0.4;

		width: s($size);
		height: s($size * 0.75);

		border: s($border) solid #333333;
		border-radius: s($border / 2);
		background: radial-gradient(circle, #4F32DF 20%, #071EB4 80%, #011494 100%);
		
		text-shadow: 0 0 s($textSize / 10) rgba(0, 0, 0);
		font-weight: bold;

		.inner {
			font-size: s($textSize);
			font-weight: bold;
			line-height: s($textSize * 1.2);
		}

		.name {
			font-size: s($textSize * 0.25);
			line-height: s($textSize * 0.25);
		}

		&.out {
			color: #CC0000;
		}

		&.headToHead {
			&[pos="0"] {
				border-color: #E3A918;
				.head-to-head .circle {
					border-color: #F9F117;
					&.filled {
						background: #F4F416;
					}
				}
			}
			&[pos="1"] {
				border-color: #4F5F8E;
				.head-to-head .circle {
					border-color: #2AD5FE;
					&.filled {
						background: #1CA7E6;
					}
				}
			}

			$size: 10;
			$border: 1;

			.head-to-head .circle {
				display: inline-block;
				width: s($size);
				height: s($size);
				margin: s(1.5);
				border: s($border) solid;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 50%;
				cursor: pointer;

				& > div {
					display: inline-block;
					width: s($size - $border);
					height: s($size - $border);
					margin: s(-$border / 2);
					border-radius: 50%;
					box-shadow: inset s(-0.3) s(-0.3) s(1) #FFFFFF;
					animation: rotate 5s linear infinite;
				}

				@keyframes rotate {
					100% { transform: rotate(360deg); }
				}
			}
		}

		&.logo .inner {
			font-size: s($textSize / 2.5);
			transform: rotate(-5deg);
		}

		&.normal,
		&.left,
		&.right {
			position: absolute;
			top: s(75);
		}
		
		&.normal {
			left: s(50 * 16/9);
			transform: translateX(-50%);
		}

		&.left {
			left: s(5);
		}

		&.right {
			left: none;
			right: s(5);
		}

	}
</style>
