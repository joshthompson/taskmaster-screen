let spin = null
let contestants = []
let current = 0

module.exports = function(io) {

	io.on('connection', _socket => {
		console.log('a user connected')
	});
	
	const router = require('express').Router()
	
	router.get('/state', (_req, res) => {
		res.send({})
	})
	
	router.post('/spin', (req, res) => {
		spin = parseFloat(req.query.speed)
		io.emit('spin', spin)
		console.log('spin', spin)
		res.sendStatus(200)
	})
	
	router.get('/spin', async (_req, res) => {
		let n = 0
		while (!spin && n < 50) {
			await new Promise(r => setTimeout(r, 250))
			n++
		}
		res.send({ spin })
		spin = null
	})

	router.get('/mode', async (req, res) => {
		// const id = parseInt(req.query.id)
		// const currentMode = req.query.mode
		// let n = 0
		// while (!spin && n < 50) {
		// 	await new Promise(r => setTimeout(r, 250))
		// 	n++
		// }
		// res.send({ spin })
		// spin = null
	})

	router.post('/contestants', (req, res) => {
		console.log(req.query.data)
		res.sendStatus(200)
	})

	router.post('/current', (req, res) => {
		console.log(req.query.data)
		res.sendStatus(200)
	})
	
	router.get('/0', (_req, res) => res.sendFile(`${__dirname}/index.html`))
	router.get('/1', (_req, res) => res.sendFile(`${__dirname}/index.html`))
	router.get('/2', (_req, res) => res.sendFile(`${__dirname}/index.html`))

	return router
}
