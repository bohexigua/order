const order = require('../models/order')

let initInput = async (ctx, next) => {
	await ctx.render('index', {
		path: 'input'
  	})
}

module.exports = {
	initInput: initInput
}