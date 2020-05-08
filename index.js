const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const contestants = require('./server/contestants')
const screen = require('./server/screen')
const scores = require('./server/score')

app.use(bodyParser.json())
console.log('\033cTASKMASTER SCREEN')

/* tslint:disable:no-console */
app.listen(3000, () => console.log('Running on http://localhost:3000'))

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use(cors())
app.use(express.static('dist'))

app.get('/state', (_req, res) => {
	res.send({
		screen: screen,
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

app.get('*', (_req, res) => {
	res.sendFile(`${__dirname}/dist/index.html`)
})

module.exports = app
