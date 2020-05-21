const router = require('express').Router()

let script = 'hello'

let scriptListeners = []

function addScriptListener(listener) {
	removeScriptListener(listener) // Remove first to avoid duplicates
	scriptListeners.push(listener)
}

function removeScriptListener(listener) {
	scriptListeners = scriptListeners.filter(sL => sL !== listener)
}

function updateScriptListeners() {
	scriptListeners.forEach(sL => sL.emit('script', script))
}

module.exports = function(io) {

	io.on('connection', (socket) => {
		io.emit('script', script)

		socket.on('i want the script', () => {
			io.emit('script', script)
			addScriptListener(io)
		})

		socket.on('i do not want the script', () => {
			removeScriptListener(io)
		})

		socket.on('update the script', (data) => {
			script = data
			updateScriptListeners()
		})
		
		socket.on('disconnect', () => {
			removeScriptListener(io)
			io.emit('user disconnected')
		})
	})

	return router
}
