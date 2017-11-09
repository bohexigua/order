let client = require("./mysql");

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

let insertOrder = async (param) => {
    await client.startTransaction();
    let res = await client.executeTransaction("INSERT INTO `order` VALUES (null, ?, ?, ?, ?, ?, ?, NOW());", param);
    await client.stopTransaction();
    return res;
}

let getAllOrders = async (s) => {
    let sPage = s;      //  起点页
    let pages = 10;     //  分页数
    await client.startTransaction();
    let res = await client.executeTransaction("SELECT * FROM `order` o, `customer` c WHERE o.customer_id = c.customer_id AND o.order_id > (? * ?) ORDER BY o.order_time DESC LIMIT ?;",
     [sPage, pages, pages]);    // 一页 10 条。
    await client.stopTransaction();
    return res;
}

let getOrderNum = async () => {
    await client.startTransaction();
    let res = await client.executeTransaction("SELECT COUNT(*) as number FROM `order`;", []);
    await client.stopTransaction();
    return res;
}

let removeOrder = async (id) => {
    await client.startTransaction();
    let res = await client.executeTransaction("DELETE FROM `order` WHERE order_id = ?;", [id]);
    await client.stopTransaction();
    return res;
}

let searchOrder = async (content) => {
    await client.startTransaction();
    let res = await client.executeTransaction("SELECT * FROM `order` o, `customer` c WHERE c.customer_id = o.customer_id AND (c.customer_name LIKE '%" + 
        content + "%' OR o.goods_name LIKE '%" + content + "%');", []);
    await client.stopTransaction();
    return res;
}

module.exports = {
	getOrderByMonth: getOrderByMonth,
	getOrderByDay: getOrderByDay,
    insertOrder: insertOrder,
    getAllOrders: getAllOrders,
    getOrderNum: getOrderNum,
    removeOrder: removeOrder,
    searchOrder: searchOrder
}