const mysql = require('mysql');
/*
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"appbazar_testbthawk"
});
*/

const con = mysql.createConnection({
	host:"server1.appsmarche.com",
	user:"appbazar_testbthawkusr",
	password:"GWXIk05}xWGp",
	database:"appbazar_testbthawk"
});

con.connect((error) => {
    if (error) console.log(error.errorno);
    else console.log('Connected');
});

module.exports = con;

