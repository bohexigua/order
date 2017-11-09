const order = require('../models/order')

let initDetails = async (ctx, next) => {
	let orders;
	await order.getAllOrders(0).then(function (val) {
		orders = val;
	})
	let orderNum;
	await order.getOrderNum().then(function (val) {
		orderNum = val;
	})
	orderNum = orderNum[0].number;
	if(orderNum % 10) {
		orderNum = orderNum / 10 + 1;
	} else {
		orderNum /= 10;
	}
	await ctx.render('index', {
		path: 'details',
		orders: orders,
		orderNum: orderNum
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
	await order.searchOrder(content).then(function(val) {
		orders = val
	})
	await ctx.render('index', {
		path: 'details',
		orders: orders,
		orderNum: orderNum
  	})
}

module.exports = {
	initDetails: initDetails,
	removeOrder: removeOrder,
	findOrder: findOrder
}