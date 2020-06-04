const router = require('express').Router()

let script = 'hello'
let contestants = []
let stuffListeners = []

function addStuffListener(listener) {
	removeStuffListener(listener) // Remove first to avoid duplicates
	stuffListeners.push(listener)
}

function removeStuffListener(listener) {
	stuffListeners = stuffListeners.filter(sL => sL !== listener)
}

function updateStuffListeners(eventName, value) {
	stuffListeners.forEach(sL => sL.emit(eventName, value))
}

module.exports = function(io) {

	io.on('connection', (socket) => {
		io.emit('script', script)

		socket.on('i want the stuff', () => {
			io.emit('script', script)
			io.emit('contestants', contestants)
			addStuffListener(io)
		})

		socket.on('i do not want the script', () => {
			removeStuffListener(io)
		})

		socket.on('update the script', (data) => {
			script = data
			updateStuffListeners('script', data)
		})

		socket.on('update the contestants', (data) => {
			contestants = data
			updateStuffListeners('contestants', data)
		})
		
		socket.on('disconnect', () => {
			removeStuffListener(io)
			io.emit('user disconnected')
		})
	})

	// Router

	router.get('/script', (_req, res) => {
		res.sendFile(`${__dirname}/script.html`)
	})

	return router
}
