const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',      // Database host (could be an IP address or domain)
    user: 'root',           // Database username
    password: '',  // Database password
    database: 'tic_tac_toe'   // Database name
});

// Establish the connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = connection;