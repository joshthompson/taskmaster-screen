<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import WLGame from '@/services/WLGame'
	import WLAudio from '@/services/WLAudio'
	import WLSettings from '@/services/WLSettings'
	import { sleep } from '@/services/helper'

	@Component
	export default class Credits extends Vue {
		@Prop() public game: WLGame
		private duration: number = 30

		public async created() {
			WLAudio.voting()
			await sleep(this.duration * 1000)
			this.$store.commit('wlSetScreenState', 'nothing')
		}

		public get style() {
			return { animationDuration: `${this.duration - 4}s` }
		}

		public get credits() {
			return [
				{
					role: 'Host',
					people: [ WLSettings.host ]
				},
				{
					role: 'Featuring',
					people: [ 'Josh Thompson' ]
				},
				{
					role: 'Music',
					people: [ 'John Farrer' ]
				},
				{
					role: 'Starring',
					people: this.game.contestants.map((c) => c.fullName)
				},
				{
					role: 'Researchers',
					people: [
						'Josh Thompson',
						'Craig Pitcher',
						'Dan Poursaeedi',
						'Weakest Link Staff'
					]
				},
				{
					role: 'Devised by',
					people: [ 'Finton Coyle', 'Cathy Dunning' ]
				},
				{
					role: 'Produced by',
					people: [ 'Josh Thompson' ]
				}
			]
		}
	}
</script>

<template>
	<div class="credits" :style="style">
		<div class="section" v-for="(section, i) in credits" :key="i">
			<div class="role">{{ section.role }}</div>
			<div v-for="(person, j) in section.people" :key="j" class="person">{{ person }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/weakest-link.scss';

	.credits {
		animation: scroll linear;
		transform: translateY(calc(-300%));

		width: $width;
		height: $height;

		.section {
			color: white;
			font-weight: bold;
			text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
			text-transform: uppercase;
			padding: $s3_5 0;

			.role {
				font-size: $s5;
			}

			.person {
				font-size: $s7_5;
			}
		}
	}

	@keyframes scroll {
		0% { transform: translateY($s100); }
	}
</style>
