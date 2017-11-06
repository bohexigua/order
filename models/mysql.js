const Clinet = require('mysql-pro');

var client = new Clinet({
	mysql: {
		host: "localhost",
		post: 3306,
		database: "order",
		user: "root",
		password: ""
	}
});

module.exports = client;