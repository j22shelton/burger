// Pull in dependencies
var mysql = require('mysql');

// Add MySQL connection object
var connection;

if (process.env.JAWSDB_URL) {

	// DB is JawsDB on Heroku
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} 
else {

	// DB is local on localhost
	connection = mysql.createConnection({
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: 'Swordfish7&',
		database: 'burgers_db'
	})
};

// Connect to MySQL
connection.connect(function(err) {
  if (err) {
    console.error('ERROR CONNECTING' + err.stack + '\n\n');
    return;
  }
  console.log('Connected as id ' + connection.threadId + '\n\n');
});

// Export connection for ORM use
module.exports = connection;
