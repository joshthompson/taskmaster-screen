<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class ContestantName extends Vue {
		@Prop() public name: string
	}
</script>

<template>
	<div class="contestant-name">
		{{ name }}
	</div>
</template>

<style scoped lang="scss">
	@import '../../style/weakest-link.scss';

	.contestant-name {
		position: absolute;
		text-transform: uppercase;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: $s70;
		color: white;
		height: $s30;
		line-height: $s30;
		font-weight: bold;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
		font-size: $s10;
		border-radius: 50%;
		background-image: url('../../assets/weakest-link/name.png');
		background-size: 100% 100%;
		background-position: center bottom;
		background-repeat: no-repeat;
	}
</style>
