import mysql from "mysql";
import * as dotEnv from "dotenv";
dotEnv.config();

// const config = {
//   user: "root",
//   password: "",
//   host: "localhost",
//   database: "blog",
//   connectAttributes: {
//     _client_name: "mysql",
//     _client_version: "5.7.0",
//     _os: "Windows",
//     _platform: "Win32",
//     _runtime_version: "v12.18.0",
//     _tcp_sequence_no: 1,
//     program_name: "mysql",
//   },
// };

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  connectAttributes: {
    _client_name: "mysql",
    _client_version: "5.7.0",
    _os: "Windows",
    _platform: "Win32",
    _runtime_version: "v12.18.0",
    _tcp_sequence_no: 1,
    program_name: "mysql",
  },
};
function connect() {
  return mysql.createConnection({ ...config });
}

let connection = connect();

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL server.");
    connection = connect(); // Reconnect after 2 seconds.
  }
});

connection.on("error", (err) => {
  console.error("Connection lost to MySQL server:");
  console.error(err);
  if (err.code !== "") {
    connection = connect(); // Reconnect on the 'error' event.
  } else {
    throw err;
  }
});

connection.on("enqueue", () => {
  connection = connect();
});

export default connection;
