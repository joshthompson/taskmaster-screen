<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import ContestantBlock from './ContestantBlock.vue'
	import { TMContestant } from '@/types/TaskMaster'

	@Component({
		components: { ContestantBlock }
	})
	export default class Scores extends Vue {
		@Prop() public contestants: TMContestant[]

		public position(contestant: TMContestant) {
			const copy = [ ...this.contestants ]
			copy.sort((a, b) => a.score > b.score ? 1 : -1)
			const pos = copy.findIndex((c) => c === contestant)
			const offset = pos - 2
			return {
				[`pos_${pos}`]: true,
				top: contestant.score > 0 && contestant.score === copy[4].score
			}
		}
	}
</script>

<template>
	<div class="scores">
		<div class="contestants">
			<ContestantBlock
				v-for="contestant in contestants"
				:contestant="contestant"
				:key="contestant.name"
				:class="position(contestant)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.scores {
		max-width: 90vw;
		margin: 0 auto;
	}

	$size: 250px;

	.contestants {
		padding-top: calc(50vh + #{$size});
		margin: 0 auto;
		transform: translateY(-50%);
		height: $size;
		position: relative;
	}
</style>
