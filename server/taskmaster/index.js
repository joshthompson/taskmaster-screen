const router = require('express').Router()

const episode = 's02e01';
const contestants = require(`./${episode}/contestants`)
const tm_screen = require(`./${episode}/screen`)
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

router.post('/state/logo', (_req, res) => {
	tm_screen.type = 'logo'
	res.sendStatus(200)
})

module.exports = router
