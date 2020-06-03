<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import WLGame from '@/services/WLGame'
	import WLAudio from '@/services/WLAudio'
	import WLDirector from '@/services/WLDirector'
	import { sleep, WLDisplayMoney } from '@/services/helper'
	import WLSettings from '@/services/WLSettings'
	import WLScript from '@/services/WLScript'
	import ContestantName from '@/components/wl/ContestantName.vue'

	@Component({
		components: { ContestantName }
	})
	export default class Intro extends Vue {
		@Prop() public game: WLGame
		private i: number = 0
		public namePlaque: string = null
		public postIntro: boolean = false

		public async created() {
			WLAudio.intro()
			this.nextShot()
			await sleep(29000)
			WLScript.set('Welcome to The Weakest Link')
			await sleep(2000)
			WLAudio.sting()
			this.postIntro = true

			const { chain } = WLSettings
			const contestantsNum = this.game.contestants.length
			const maxRound = chain[chain.length - 1]
			const max = WLDisplayMoney(maxRound * (contestantsNum + 2), false, '', 'toilet roll')

			WLScript.set(`Any of the ${contestantsNum} people in this video call today could win up to ${max}.`)
			await sleep(6000)
			WLScript.set(`
				They don't like each other, but to get the prize they'll have to work together.<br />
				However, ${contestantsNum - 1} will leave with nothing - as round by round we lose the player
				voted the Weakest Link
			`)
			await sleep(10000)
			WLScript.set(`Let's meet the team`)
			await sleep(2000)
			WLAudio.sting2()
			await sleep(3000)
			for (let i = 0; i < this.game.contestants.length; i++) {
				const c = this.game.contestants[i]
				this.namePlaque = c.name
				WLDirector.set(c.googleName)
				WLScript.set(`<em>[ ${c.name} introduction ]</em>`)
				await sleep(8000)
			}
			WLAudio.sting2()
			this.namePlaque = ''
			WLDirector.set(WLSettings.hostGoogle)
			WLScript.set(WLScript.empty)
			await sleep(2500)
			WLDirector.set('free')
			WLScript.set(`
				Just to remind you of the rules, in each round there is ${WLDisplayMoney(maxRound, false, '', 'toilet roll')} to be won.<br />
				The fastest way to do this is to create a chain of ${chain.length} correct answers.<br />
				Break the chain and you lose all the money in that chain.
				Say bank before the question is asked and the money is safe.
			`)
			await sleep(2500)
			WLDirector.set('free')
			this.$store.commit('wlSetScreenState', 'nothing')
		}

		public async nextShot() {
			if (this.i < this.game.contestants.length * 2) {
				const contestant = this.game.contestants[this.i++ % this.game.contestants.length]
				WLDirector.set(contestant.googleName)
				setTimeout(() => this.nextShot(), 1500)
			} else {
				WLDirector.set(WLSettings.hostGoogle)
			}
		}
	}
</script>

<template>
	<div class="intro">
		<ContestantName v-if="namePlaque" :name="namePlaque" />
		<div class="weakest" v-if="!postIntro"></div>
		<div class="link" v-if="!postIntro"></div>
		<div class="rolls" v-if="!postIntro"></div>
		<div class="fake" v-if="!postIntro"></div>
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/sizing.scss';

	$time: 28s;

	.weakest {
		animation: weakest $time ease-in;
		position: absolute;
		background: url('/weakest-link/weakest.png');
		background-size: contain;
		background-repeat: no-repeat;
		z-index: 1;
		top: $s15;
		left: $s50;
		width: $s50;
		height: $s50;
	}
	.link {
		animation: link $time ease-in;
		position: absolute;
		background: url('/weakest-link/link.png');
		background-size: contain;
		background-repeat: no-repeat;
		z-index: 3;
		left: $s110;
		top: $s40;
		width: $s50;
		height: $s50;
	}
	.rolls {
		animation: rolls $time ease-in;
		position: absolute;
		background: url('/weakest-link/rolls.png');
		background-size: contain;
		background-repeat: no-repeat;
		z-index: 2;
		top: $s25;
		left: $s50;
		width: $s70;
		height: $s70;
	}
	.fake {
		animation: fake $time ease-in;
		position: absolute;
		background: url('/weakest-link/fake.png');
		background-size: contain;
		background-repeat: no-repeat;
		z-index: 4;
		top: $s40;
		left: $s50;
		width: $s60;
		height: $s60;
	}

	@keyframes weakest {
		0%, 50% {
			left: $s200;
			top: 50%;
			transform: rotate(300deg);
		}
	}

	@keyframes link {
		0%, 50% {
			transform: rotate3d(1, 0.3, 10, 390deg);
			top: $s-30;
			left: $s-30;
		}
	}

	@keyframes rolls {
		0%, 50% {
			transform: rotate3d(3, 1, 0.2, -390deg);
			top: $s100;
			left: $s50;
		}
	}

	@keyframes fake {
		0%, 90% {
			opacity: 0;
			transform: scale(2);
		}
	}

</style>
