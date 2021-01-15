const mysql = require('mysql');

let connection;

const getConnection = () => {
  // If connection does not exist, I create it.
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  // If the 'connection' has disconnected, I connect it.
  if (connection && connection.state === 'disconnected') {
    connection.connect((err) => {
      if (err) {
        console.error(`Error connecting ${err.stack}`);
      }
      console.log(`Database connected as id: ${connection.threadId}`);
    });
  }

  return connection;
};

module.exports = getConnection();
