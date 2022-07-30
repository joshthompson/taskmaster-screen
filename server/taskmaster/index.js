const router = require('express').Router()

const episode = 's02e03';
const contestants = require(`./${episode}/contestants`)
let tm_screen = require(`./${episode}/screen`)
const scores = require(`./${episode}/score`)

router.get('/state', (_req, res) => {
	res.send({
		screen: tm_screen,
		contestants: contestants.map(c => {
			return {
				name: c.name,
				icon: c.icon,
				score: Object.keys(scores)
						.map(round => scores[round][c.name] || 0)
						.reduce((a, b) => a + b, 0)
			}
		})
	})
})

router.get('/state/set', (req, res) => {
	console.log(req._parsedUrl.query.replace('state=', ''))
	tm_screen = JSON.parse(req._parsedUrl.query.replace('state=', '').replace(/%22/g, '"'));
	res.sendStatus(200)
})

module.exports = router
