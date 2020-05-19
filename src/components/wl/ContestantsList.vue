<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import ContestantBlock from '@/components/wl/ContestantBlock.vue'
	import { WLContestant, WLState } from '@/types/WeakestLink'

	@Component({
		components: { ContestantBlock }
	})
	export default class ContestantName extends Vue {

		@Prop() public gameObj

		public get game() {
			return (this.$store.state.wl as WLState).game
		}

		public get contenstantOut() {
			return this.game.contestants 
				.filter((c) => c.out)
				.sort((a, b) => a.outTime > b.outTime ? 1 : - 1)
		}

		public voteOut(contestant: WLContestant, out: boolean) {
			this.gameObj.vote(contestant.name, out)
		}
	}
</script>

<template>
	<div v-if="game">
		<div>
			<h3>Strongest Link</h3>
			<ContestantBlock
				v-for="contestant in game.strongest"
				:key="contestant.name"
				:name="contestant.name"
				@voteOut="voteOut(contestant, $event)"
			/>
		</div>
		<div>
			<ContestantBlock
				v-for="(contestant, i) in contenstantOut"
				:key="contestant.name"
				:name="contestant.name"
				:i="i"
				@voteOut="voteOut(contestant, $event)"
			/>
		</div>
	</div>
</template>
