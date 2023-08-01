import mysql from 'mysql';
import * as dotEnv from 'dotenv';
dotEnv.config()

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
const connection = mysql.createConnection({
    ...config 
});


export default connection
