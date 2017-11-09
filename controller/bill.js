const bill = require('../models/bill')

let closeout = async (ctx, next) => {
	let effect;
	await bill.updateBill().then(function (val) {
		effect = val;
	})
	if(effect.OkPacket) {
		return ctx.response.body = {message: 'success'};
	} else {
		return ctx.response.body = {message: 'failed'};
	}
}

module.exports = {
	closeout: closeout
}