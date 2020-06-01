module.exports = {
	chainWebpack: (config) => {
		config.module
			.rule('csv')
			.test(/\.csv$/)
			.use('csv-loader')
			.loader('csv-loader')
			.options({
				header: true,
				skipEmptyLines: true
			})
			.end()
	}
}
