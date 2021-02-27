<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator'
	import PLAudio from '@/services/pl/PLAudio'
	import PLSettings from '@/services/pl/PLSettings'
	import { PointlessGame } from '@/types/Pointless'
	import CircleOverlay from '@/components/pl/CircleOverlay.vue'
	
	@Component({
		components: { CircleOverlay }
	})
	export default class PointlessCredits extends Vue {

		@Prop() public game: PointlessGame
		private duration: number = 32

		public get style() {
			return { animationDuration: `${this.duration - 4}s` }
		}

		public get credits() {
			let credits = [
				{
					role: 'Host',
					people: [ PLSettings.host ]
				},
				...(PLSettings.cohost ? [{
					role: 'Co Host',
					people: [ PLSettings.cohost ]
				}] : []),
				{
					role: 'Sound Design',
					people: [ 'Mikael Hellman', 'Josh Thompson' ]
				},
				{
					role: 'Starring',
					people: this.game.teams.map((t) => t.credits).flat().sort((a, b) => a > b ? 1 : -1)
				},
				{
					role: 'Special Thanks To',
					people: [
						'Emilie Collins',
						'Ffion Spooner',
						'Hjalmar Ekengren',
						'Jack Thompson',
						'Jasmine Rule',
						'Jeremy Tan',
						'Jérôme Beresford',
						'Joe Madden',
						'Jonas Eriksson',
						'June Voss',
						'Lara Elble',
						'Lola Buades Balle',
						'Nick Johnson',
						'Nick Mytton',
						'Pierre Lindgren',
						'Queenie Lee',
						'Rikard Stenlund',
						'Samantha Clements',
						'Tom Williams',
						'Wendy Thompson'
					].sort((a, b) => a > b ? 1 : -1)
				},
				{
					role: 'Produced by',
					people: [ 'Josh Thompson' ]
				}
			]
			if (PLSettings.host === PLSettings.cohost) {
				credits = credits.filter((section) => section.role !== 'Co Host')
			}
			return credits
		}

		public created() {
			PLAudio.intro()
			setTimeout(() => this.$emit('finished'), 29000)
		}
	}
</script>

<template>
	<CircleOverlay class="credits-background">
		<div class="pointless-credits" :style="style">
			<div class="section" v-for="(section, i) in credits" :key="i">
				<div class="role">{{ section.role }}</div>
				<div v-for="(person, j) in section.people" :key="j" class="person">{{ person }}</div>
			</div>
		</div>
	</CircleOverlay>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.credits-background {
		background: radial-gradient(circle, rgb(79, 50, 223) 20%, rgb(7, 30, 180) 80%, rgb(1, 20, 148) 100%);	
	}

	.pointless-credits {
		animation: scroll linear;
		transform: translateY(-360%);

		width: $width;
		height: $height;


		.section {
			color: #FFFFFF;
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
		0% { transform: translateY($height); }
	}
</style>
