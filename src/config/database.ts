import mysql from "mysql";
import * as dotEnv from "dotenv";
dotEnv.config();

// const config = {
//     user: "root",
//     password: "",
//     host: "localhost",
//     database: "Blog"
// };

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DB_NAME,
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection({ ...config }); 
  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    } 
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
  return connection;
}

export default handleDisconnect();
