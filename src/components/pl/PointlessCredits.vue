<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import PLAudio from '@/services/pl/PLAudio'

	@Component
	export default class PointlessCredits extends Vue {
		public created() {
			PLAudio.intro()
		}
	}
</script>

<template>
    <div class="pointless-credits">
		
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';


</style>
