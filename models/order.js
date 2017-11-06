let client = require("./mysql");

// let date = new Date();
// let year = date.getFullYear();
// let month = date.getMonth() + 1;
// month = (month < 10 ? "0" + month : month);
// let day = date.getDate();
// day = (day < 10 ? "0" + day : day);

let getOrderByMonth = async () => {
    await client.startTransaction();
    let res = await client.executeTransaction("SELECT * FROM `order` WHERE DATE_FORMAT(order_time, '%Y%m') = DATE_FORMAT(CURDATE(), '%Y%m');", []);
    await client.stopTransaction();
    return res;
}

let getOrderByDay = async () => {
    await client.startTransaction();
    let res = await client.executeTransaction("SELECT * FROM `order` WHERE TO_DAYS(order_time) = TO_DAYS(NOW());", []);
    await client.stopTransaction();
    return res;
}

module.exports = {
	getOrderByMonth: getOrderByMonth,
	getOrderByDay: getOrderByDay
}