const router = require('express').Router()

router.get('/state', (_req, res) => {
	res.send({})
})

router.get('/state/set', (req, res) => {
	console.log(req._parsedUrl.query.replace('state=', ''))
	tm_screen = JSON.parse(req._parsedUrl.query.replace('state=', '').replace(/%22/g, '"'));
	res.sendStatus(200)
})

router.get('/', (_req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})

module.exports = router
