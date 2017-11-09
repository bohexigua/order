const order = require('../models/order')
const details = require('./details')
const customer = require('../models/customer');

let initInput = async (ctx, next) => {
	await ctx.render('index', {
		path: 'input'
  	})
}

let saveInput = async (ctx, next) => {
	let params = []
	let body = ctx.request.body
	let customerName = body.customer
	let customerId
	await customer.getCustomerByName(customerName).then(function (val) {
		if(!val.length) {
			customerId = -1
		} else {
			customerId = val[0].customer_id
		}
	})
	if(customerId == -1) {
		await customer.insertCustomer(customerName)
		await customer.getCustomerByName(customerName).then(function (val) {
			customerId = val[0].customer_id
		})
	}
	params.push(customerId)
	params.push(body.number)
	params.push(body.goods)
	params.push(body.total)
	params.push(body.profit)
	params.push(body.desc)
	await order.insertOrder(params)
	await details.initDetails(ctx, next)
}

module.exports = {
	initInput: initInput,
	saveInput: saveInput
}