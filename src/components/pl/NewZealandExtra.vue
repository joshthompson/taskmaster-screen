<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Slides from '@/components/pl/Slides.vue'
	
	@Component({
		components: { Slides }
	})
	export default class NewZealandExtra extends Vue {
		public i: number = 0
	}
</script>

<template>
	<Slides>
		<div v-if="i === 0" @click="i = (i + 1) % 4" class="slide" key="nz1">
			<img src="/pointless/extra/nz-1.png" />
		</div>
		<div v-if="i === 1" @click="i = (i + 1) % 4" class="slide" key="nz2">
			<img src="/pointless/extra/nz-2.jpg" />
		</div>
		<div v-if="i === 2" @click="i = (i + 1) % 4" class="slide" key="nz3">
			<img src="/pointless/extra/nz-3.jpg" />
		</div>
		<div v-if="i === 3" @click="i = (i + 1) % 4" class="slide" key="nz4">
			<img src="/pointless/extra/nz-4.jpg" />
		</div>
	</Slides>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	img {
		height: s(80);
		transform: translateY(-50%);
	}
</style>
