let client = require("./mysql");

let getBill = async () => {
    await client.startTransaction();
    let res = await client.executeTransaction("SELECT bill_value FROM bill WHERE bill_id = (SELECT MAX(bill_id) FROM bill);", []);
    await client.stopTransaction();
    return res;
}

let updateBill = async () => {					// 即清账
    await client.startTransaction();
    let res = await client.executeTransaction("INSERT INTO bill VALUES (NULL, 0, (SELECT MAX(order_id) FROM `order`));", []);
    await client.stopTransaction();
    return res;
}

module.exports = {
	getBill: getBill,
	updateBill: updateBill
}