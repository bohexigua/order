const order = require('../models/order')

let initDetails = async (ctx, next) => {
	let orders;
	await order.getAllOrders().then(function (val) {
		orders = val;
	})
	await ctx.render('index', {
		path: 'details',
		orders: orders
  	})
}

let removeOrder = async (ctx, next) => {
	initDetails();
}

module.exports = {
	initDetails: initDetails,
	removeOrder: removeOrder
}