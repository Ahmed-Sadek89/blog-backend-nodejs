import mysql from 'mysql';

const config = { 
    user: "root", 
    password: "",
    host: "localhost",
    database: "Blog" 
};

const connection = mysql.createConnection({
    ...config 
});


export default connection
