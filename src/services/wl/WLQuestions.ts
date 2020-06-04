interface RawQuestion {
	Question: string
	Answer: string
	Round: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'final'
	UK: '1' | ''
	Used: '1' | ''
}

interface Question {
	question: string
	answer: string
}

type Round = Question[]

interface FullGame {
	round_1?: Round
	round_2?: Round
	round_3?: Round
	round_4?: Round
	round_5?: Round
	round_6?: Round
	round_7?: Round
	round_8?: Round
	round_final?: Round
}

import raw1 from '@/data/WL_Weakest_Link_Questions.csv'
import raw2 from '@/data/WL_Original_Questions.csv'
import WLSettings from './WLSettings'
const rawQuestions: RawQuestion[] = [ ...raw1, ...raw2 ]

const questions: FullGame = {
	round_1: [],
	round_2: [],
	round_3: [],
	round_4: [],
	round_5: [],
	round_6: [],
	round_7: [],
	round_8: [],
	round_final: []
}

rawQuestions.forEach((q) => {
	const ukCheck = !WLSettings.notUK || WLSettings.notUK && q.UK === ''
	const usedCheck = !WLSettings.notUsed || WLSettings.notUsed && q.Used === ''
	if (ukCheck && usedCheck) {
		questions[`round_${q.Round}`].push({
			question: q.Question,
			answer: `${q.Answer}`
		})
	}
})

function mathsQuestion(round: number = 1): Question {
	const a = 20 * round + Math.ceil(Math.random() * 100)
	const b = 20 * round + Math.ceil(Math.random() * 100)
	return {
		question: `What is ${a} + ${b}?`,
		answer: `${a + b}`
	}
}

function getQuestion(round: number | string): Question {
	const roundQuestions: Round = questions[`round_${round}`]
	const theQuestion = roundQuestions.splice(Math.floor(Math.random() * roundQuestions.length), 1)[0]
	return theQuestion || mathsQuestion(typeof round === 'number' ? round : 10)
}

export default {
	getQuestion
}
