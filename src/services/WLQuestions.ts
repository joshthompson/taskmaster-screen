function getQuestion(round: number) {
	const a = Math.ceil(Math.random() * 100)
	const b = Math.ceil(Math.random() * 100)
	return {
		q: `What is ${a} + ${b}?`,
		a: `${a + b}`
	}
}

export default {
	getQuestion
}
