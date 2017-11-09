let client = require("./mysql");

let getCustomerByName = async (name) => {
    await client.startTransaction();
    let res = await client.executeTransaction("SELECT * FROM `customer` where customer_name = ?;", [name]);
    await client.stopTransaction();
    return res;
}

let insertCustomer = async (name) => {
    await client.startTransaction();
    let res = await client.executeTransaction("INSERT INTO customer VALUES (null, ?);", [name]);
    await client.stopTransaction();
    return res;
}

module.exports = {
	getCustomerByName: getCustomerByName,
	insertCustomer: insertCustomer
}