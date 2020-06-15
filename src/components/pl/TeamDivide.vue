<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class TeamDivide extends Vue {
		@Prop() public mode: ScrollSetting
	}
</script>

<template>
    <div :class="{ 'team-divide': true, [mode]: true }">
        <div class="front"></div>
        <div class="back"></div>
    </div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

    .team-divide {
        
        &.none {
            display: none;
        }

        &.right .front,
        &.right .back {
            transform: scaleX(-1);
        }

        .front,
        .back {
            position: absolute;
            width: $width;
            height: $height;
            top: 0;
            left: 0;
            z-index: 10000;
            background-image: url("../../assets/pointless/split-front.svg");
            background-size: 103%;
            background-repeat: no-repeat;
            background-position: s(-10);
            pointer-events: none;
        }

        .back {
            background-image: url("../../assets/pointless/split-back.svg");
            z-index: 0;
            background-size: 120%;
        }

    }
</style>
