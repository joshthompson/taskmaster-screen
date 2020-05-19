interface Question {
	q: string
	a: string
}

type Round = Question[]

interface FullGame {
	[roundName: string]: Round
}


const questions: FullGame = {
	round1: [
		maths(),
		maths(),
		maths(),
		maths(),
		maths(),
		maths(),
		maths(),
		maths(),
		maths(),
		maths(),
		maths(),
		maths()
	],
	round2: [
		maths()
	]
}

function maths(): Question {
	const a = Math.ceil(Math.random() * 100)
	const b = Math.ceil(Math.random() * 100)
	return {
		q: `What is ${a} + ${b}?`,
		a: `${a + b}`
	}
}

function getQuestion(round: number) {
	return questions[`round${round}`][0]
}

export default {
	getQuestion
}
