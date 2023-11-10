import mysql from "mysql";
import * as dotEnv from "dotenv";
dotEnv.config();

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DB_NAME,
};

function connect() {
  return mysql.createConnection({ ...config });
}

let connection = connect();

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL server.");
    setTimeout(connect, 2000); // Reconnect after 2 seconds.
  }
});

connection.on("error", (err) => {
  console.error("Connection lost to MySQL server:");
  console.error(err);
  if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
    connection = connect(); // Reconnect on the 'error' event.
  } else {
    throw err;
  }
});

export default connection;
