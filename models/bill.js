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

let setBill = async (money) => {                  // 累加账单
    await client.startTransaction();
    let bid = await client.executeTransaction("SELECT MAX(bill_id) as bid FROM bill;", []);
    let res = await client.executeTransaction("UPDATE `bill` SET bill_value = bill_value + ? WHERE bill_id = ?;", [money, bid[0].bid]);
    await client.stopTransaction();
    return res;
}

module.exports = {
	getBill: getBill,
    setBill: setBill,
	updateBill: updateBill
}