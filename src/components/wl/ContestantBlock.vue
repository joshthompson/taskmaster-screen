<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { WLState } from '@/types/WeakestLink'

	@Component
	export default class ContestantBlock extends Vue {
		@Prop() public name
		@Prop() public i?: number

		public get contestant() {
			return (this.$store.state.wl as WLState).game.contestants.find((c) => c.name === this.name)
		}

		public get time() {
			return Math.floor(this.contestant.time / this.contestant.total / 1000 * 10) / 10
		}

		public get out() {
			return this.contestant.out
		}

		public get orderOut() {
			const order = this.i + 1
			return `${order}${
				order === 1 ? 'st' :
				order === 2 ? 'nd' :
				order === 3 ? 'rd' : 'th'
			}`
		}
	}
</script>

<template>
	<div class="contestant-block" :class="{ out: out }" v-if="contestant">
		<div>
			<div class="name">{{ contestant.name }}</div>
			<div v-if="out" class="out">OUT {{ orderOut }}</div>
			<div v-if="!out" class="correct">{{ contestant.right || 0 }}/{{ contestant.total || 0 }}</div>
			<div v-if="!out">({{ time || '∞' }} secs)</div>
		</div>
		<div>
			<div v-if="!out" class="banked">Banked: {{ contestant.banked || 0 }}</div>
			<div v-if="!out" class="lost">Lost: {{ contestant.lost || 0 }}</div>
			<div>
				<button v-if="!out" @click="$emit('voteOut', true)" class="btn">Voted Out</button>
			</div>
			<div>
				<button v-if="out" @click="$emit('voteOut', false)" class="btn">Add back in</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.contestant-block {
		margin-bottom: 0.25rem;
		padding: 0.25rem;
		border-radius: 0.5rem;
		background: #AAAAAA;
		color: #000000;
		text-align: left;

		.actions {
			display: block;
			text-align: center;
		}

		&.out {
			opacity: 0.5;
		}

		& > div {
			display: flex;
			width: 100%;
			& > div:nth-child(1) {
				text-align: left;
			}
			& > div:nth-child(2) {
				text-align: center;
				flex-grow: 1;
			}
			& > div:nth-child(3) {
				text-align: right;
			}
		}

		.name {
			font-weight: bold;
		}

		.out {
			font-weight: bold;
		}
	}
</style>
