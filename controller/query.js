const order = require('../models/order')

let initDetails = async (ctx, next) => {
	await ctx.render('index', {
		path: 'details'
  	})
}

module.exports = {
	initDetails: initDetails
}