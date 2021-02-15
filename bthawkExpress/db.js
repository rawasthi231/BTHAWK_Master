const mysql = require('mysql');
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"appbazar_testbthawk"
});

con.connect((error) => {
    if (error) throw error;
});

module.exports = con;
