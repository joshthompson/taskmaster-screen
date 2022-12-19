const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:8080'
	}
})
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())

console.log('\033cGAME SHOW SCREEN')

/* tslint:disable:no-console */
server.listen(6226)

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use(cors())
app.use(express.static('public'))

app.use('/taskmaster', require('./server/taskmaster'))
app.use('/weakest-link', require('./server/weakest-link')(io))
app.use('/wheel-of-fortune', require('./server/wheel-of-fortune')(io))

let director = 'free'
app.get('/set-director/:director', (req, res) => {
	director = req.params.director
	res.send({ director })
})
app.get('/director', (_req, res) => {
	res.send({ director })
})

// app.get('*', (_req, res) => {
// 	res.sendFile(`${__dirname}/dist/index.html`)
// })

module.exports = app
