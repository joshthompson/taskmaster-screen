const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())

const data = {
	mode: 'scores',
	contestants: [
		{
			name: 'nick',
			icon: '/images/nick.png'
		},
		{
			name: 'holly',
			icon: '/images/holly.png'
		},
		{
			name: 'leo',
			icon: '/images/leo.png'
		},
		{
			name: 'vicki',
			icon: '/images/vicki.png'
		},
		{
			name: 'paul',
			icon: '/images/paul.png'
		}
	]
}

const rounds = {
	showAndTell: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	},
	water: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	},
	drawing: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	},
	swede: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	},
	rainbow: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	},
	lava: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	},
	final: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	},
	bonus: {
		nick: 0,
		holly: 0,
		leo: 0,
		vicki: 0,
		paul: 0
	}
}

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
		mode: data.mode,
		contestants: data.contestants.map(c => {
			return {
				name: c.name,
				icon: c.icon,
				score: Object.keys(rounds).map(r => rounds[r][c.name] || 0).reduce((a, b) => a + b, 0)
			}
		})
	})
})

app.get('*', (_req, res) => {
	res.sendFile(`${__dirname}/dist/index.html`)
})

app.get

module.exports = app
