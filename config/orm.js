// Import MySQL 
var connection = require ('./connection.js');

// Helper function for making MySQL syntax
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// Helper function for making My SQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

// Add ORM object to perform SQL queries
var orm = {

	// Function to return table entries
	selectAll: function(tableInput, cb) {

		// Construct the query string that returns the rows 
		var queryString = "SELECT * FROM " + tableInput + ";";

		// Database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Callback
			cb(result);
		});
	},

	// Insert a single table entry
	insertOne: function(table, cols, vals, cb) {

		// Add query string that inserts a single row 
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);

		// Database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			// Callback
			cb(result);
		});
	},

	// Update a single table entry
	updateOne: function(table, objColVals, condition, cb) {

		// Construct the query string that updates the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);

		// Database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Callback
			cb(result);
		});
	}
};

// Export the orm object 
module.exports = orm;
