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

router.post('/insertorder.ejs', input.saveInput)

router.get('/removeorder.ejs', details.removeOrder)

router.get('/search.ejs', details.findOrder)

router.get('/refreshDetails.ejs', details.initDetails)

module.exports = router