<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { PointlessAnswer } from '@/types/Pointless'

	@Component
	export default class AnswerBlock extends Vue {
		@Prop() public answer: PointlessAnswer
		@Prop() public selected: boolean
	}
</script>

<template>
	<a class="pointless-answer-block" @click="$emit('selected', answer)" :class="{ selected }">
		<div class="answer"> {{ answer.answer }}</div>
		<div class="score"> {{ answer.score }}</div>
	</a>
</template>

<style lang="scss">
	@import '@/style/sizing.scss';

    .pointless-answer-block {
        display: flex;
        width: 100%;

        border-radius: s(3);
        height: s(6);
        line-height: s(5.5);
        border: s(0.3) solid #FFFFFF;
        background: linear-gradient(0deg, rgba(107,22,154,1) 5%, rgba(121,43,175,1) 16%, rgba(128,53,186,1) 29%, rgba(107,45,168,1) 45%, rgba(6,5,80,1) 88%);
        margin: s(1) 0;
        text-transform: uppercase;
        font-weight: bold;
        text-shadow: 0 0 s(0.25) rgba(0, 0, 0, 0.5);
        box-shadow: inset 0 0 s(1) rgba(6, 5, 80, 1);
        cursor: pointer;
        transition: all 0.3s ease-in;

        &.selected {
            box-shadow: inset 0 0 s(1) rgba(6, 5, 80, 1), 0 0 s(2) #FFFFFF;
            filter: brightness(1.25);
        }
        
        .answer {
            flex-grow: 1;
        }

        .score {
            background: linear-gradient(0deg, rgba(73,37,149,1) 0%, rgba(6,5,61,1) 100%);
            box-shadow: inset 0 0 s(1) rgba(0, 0, 0, 0.5);
            margin: s(-0.3) s(-0.3) 0 0;
            border: s(0.3) solid #FFFFFF;
            border-radius: s(3);
            width: s(6);
            height: s(6);
        }
    }
</style>
