module.exports = function(io) {

	io.on('connection', _socket => {
		console.log('a user connected')
	});

	const router = require('express').Router()

	router.get('/state', (_req, res) => {
		res.send({})
	})
	
	router.post('/spin', (req, res) => {
		io.emit('spin', parseFloat(req.query.speed))
		res.sendStatus(200)
	})
	
	router.get('/', (_req, res) => {
		res.sendFile(`${__dirname}/index.html`)
	})

	return router
}
