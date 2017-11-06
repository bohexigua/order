const order = require('../models/order');
const bill = require('../models/bill');

let initIncome = async (ctx, next) => {
	let monthOrder;
	await order.getOrderByMonth().then((val) => {
		monthOrder = val;
	});
	let dayOrder;
	await order.getOrderByDay().then((val) => {
		dayOrder = val;
	});
	let monthOrderNum = 0.0;
	let dayOrderNum = 0.0;
	let monthOrderProfit = 0.0;
	let dayOrderProfit = 0.0;
	for(let value of monthOrder) {
		monthOrderNum += parseFloat(value.goods_value);
		monthOrderProfit +=  parseFloat(value.goods_profit);
	}
	for(let value of dayOrder) {
		dayOrderNum += parseFloat(value.goods_value);
		dayOrderProfit +=  parseFloat(value.goods_profit);
	}
	let billValue; 
	await bill.getBill().then((val) => {
		billValue = val[0].bill_value;
	});
	await ctx.render('index', {
		path: 'income',
    	monthOrderNum: monthOrderNum,
    	monthOrderProfit: monthOrderProfit,
    	dayOrderNum: dayOrderNum,
    	dayOrderProfit: dayOrderProfit,
    	billValue: billValue
  	})
}

module.exports = {
	initIncome: initIncome
}