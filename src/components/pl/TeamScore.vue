<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessTeam } from '@/types/Pointless'
	import { scoreToBeat, potentialMax } from '@/services/pl/data'

	@Component
	export default class TeamScore extends Vue {
		@Prop() public team: PointlessTeam
		@Prop({ default: 'normal' }) public mode: string

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
	}
</script>

<template>
	<div :class="{ 'team-score': true, [mode]: true, logo: scoreString === 'Pointless', out }">
		<div class="inner">{{ scoreString }}</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

    .team-score {

		display: inline-block;

		$size: 30;
		$border: 2;
		$textSize: $size * 0.4;

		width: s($size);
		height: s($size * 0.75);

		border: s($border) solid #333333;
		border-radius: s($border / 2);
		background: radial-gradient(circle, rgb(79, 50, 223) 20%, rgb(7, 30, 180) 80%, rgb(1, 20, 148) 100%);
		
		.inner {
			font-size: s($textSize);
			text-shadow: 0 0 s($textSize / 10) rgba(0, 0, 0);
			font-weight: bold;
			line-height: s($textSize * 1.5);
		}

		&.out {
			color: #CC0000;
		}

		&.logo .inner {
			font-size: s($textSize / 2.5);
			transform: rotate(-5deg);
		}
        
        &.none {
            display: none;
        }

        &.right .front,
        &.right .back {
            transform: scaleX(-1);
        }

    }
</style>
