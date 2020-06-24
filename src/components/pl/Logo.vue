<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class Logo extends Vue {
		@Prop() extra: string
	}
</script>

<template>
	<div class="pointless-logo">
		<div>Fake</div>
		<div>
			<span>Po</span>
			<div class="i">
				<div v-for="i in 12" :key="i"></div>
			</div>
			<span>ntless</span>
		</div>
		<div v-if="extra" class="extra">{{ extra }}</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	
	.pointless-logo {

		text-transform: uppercase;
		
		text-shadow: -0.03em 0 0 #F0EBEB,
					 -0.06em 0 0 #9F81BA,
					 -0.09em 0 0 #F0EBEB;
		
		.extra {
			text-shadow: -0.08em 0 #F0EBEB;
		}

		.i {
			display: inline-block;

			& > div {
				height: 0.04em;
				width: 0.2em;
				background: #FFFFFF;
				margin: 0 0.1em 0.02em;
				box-shadow: -0.03em 0 0 #F0EBEB,
							-0.06em 0 0 #9F81BA,
							-0.09em 0 0 #F0EBEB;
			}
		}
	}
</style>