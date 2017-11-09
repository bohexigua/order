const order = require('../models/order')
const details = require('./details')

let initInput = async (ctx, next) => {
	await ctx.render('index', {
		path: 'input'
  	})
}

let saveInput = async (ctx, next) => {
	details.initDetails();
}

module.exports = {
	initInput: initInput,
	saveInput: saveInput
}