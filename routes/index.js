const router = require('koa-router')()
const income = require('../controller/income')
const input = require('../controller/input')
const details = require('../controller/details')
const query = require('../controller/query')
const bill = require('../controller/bill')

router.get('/', income.initIncome)

router.get('/income.ejs', income.initIncome)

router.get('/input.ejs', input.initInput)

router.get('/details.ejs', details.initDetails)

router.get('/closeout.ejs', bill.closeout)

module.exports = router