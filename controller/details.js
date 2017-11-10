const order = require('../models/order')

let initDetails = async (ctx, next) => {
	let page = ctx.request.query.page
	if(typeof page === 'undefined') page = 1
	page -= 1
	let total = 10
	let orders
	await order.getAllOrders(page).then(function (val) {
		orders = val
	})
	let orderNum
	await order.getOrderNum().then(function (val) {
		orderNum = val
	})
	orderNum = orderNum[0].number
	if(orderNum % total) {
		orderNum = orderNum / total + 1
	} else {
		orderNum /= total
	}
	await ctx.render('index', {
		path: 'details',
		orders: orders,
		orderNum: orderNum,
		page: page
  	})
}

let removeOrder = async (ctx, next) => {
	let id = ctx.request.query.id;
	await order.removeOrder(id);
	await initDetails(ctx, next);
}

let findOrder = async (ctx, next) => {
	let content = ctx.request.query.search
	let orders
	let orderNum = 1
	let page = 0
	await order.searchOrder(content).then(function(val) {
		orders = val
	})
	await ctx.render('index', {
		path: 'details',
		orders: orders,
		orderNum: orderNum,
		page: page
  	})
}

module.exports = {
	initDetails: initDetails,
	removeOrder: removeOrder,
	findOrder: findOrder
}