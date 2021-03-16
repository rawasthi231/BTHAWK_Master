/**
 * File Name : distributor_profile.js
 * File Type : Express Server Route
 * Creator : Raghvendra Awasthi
 * Version : 1.0
    This Router includes routes for 
 * Distributor profile view
*/
const express = require('express');
const router = express.Router();
const con = require('../db');
const CommonUtility = require('./CommonUtility');
var response = {};
var obj = new CommonUtility();
var date = obj.getDate();
var time = obj.getTime();
var dateTime = date + " " + time;


// Route for fetching details of logged in distributor
router.post('/distributor_profile', (req, res) => {
    let dis_id = req.body.dis_id;

    try {
        let sqlQuery = `SELECT * FROM tbl_distributor WHERE distributor_id = '${dis_id}'`;
        con.query(sqlQuery, (err, row) => {
            if (err) throw err;
            else if (row.length) {
                response.status = "200";
                response.msg = "Distributor Details Successfully Fetched";
                response.data = row[0];
            } else {
                response.status = "202";
                response.msg = "No data found";
            }
            res.end(JSON.stringify(response));
        });
    } catch (e) {
        throw e;
    }
});


// Route for change password of logged in user
router.post('/change_password', (req, res) => {
    let dis_email = req.body.dis_email;
    let current_pass = req.body.current_pass;
    let new_pass = req.body.new_pass;

    try {
        let query1 = `SELECT distributor_user_id FROM tbl_distributor_users WHERE distributor_email = ${dis_email} AND password = ${current_pass}`;
        con.query(query1, (err, row) => {
            if(err) throw err;
            else if(row.length){
                let query2 = `UPDATE tbl_distributor_users SET password = ${new_pass} WHERE distributor_email = ${dis_email}`;
                con.query(query2, (error, result) => {
                    if(error) throw error;
                    else if(result.affectedRows){
                        response.status = "200";
                        response.msg = "Password changed successfully."
                    }
                });
            } else{
                response.status = "402";
                response.msg = "Current password is incorrect."
            }
            res.end(JSON.stringify(response));
        });
    } catch (e) {
        throw e;
    }
});


// Route for Add Bank Master for Distributor
router.post('/add_bank_master', (req, res) => {
    let dis_id = req.body.dis_id;
    let bank_name = req.body.bank_name;
    let acc_no = req.body.acc_no;
    let branch_name = req.body.branch_name;
    let ifsc = req.body.ifsc;
    let acc_name = req.body.acc_name;
    let bank_type = req.body.bank_type;

    let query1 = `select * from tbl_distributor_bank_master where distributor_id = ${dis_id} AND account_no = ${acc_no}`;
    con.query(query1, (err, row) => {
        if(err) throw err;
        else if(row.length < 1){
            if(bank_type == 'Primary'){
                let query2 = `UPDATE tbl_distributor set ifsc_no = ${ifsc} , branch = ${branch_name}, account_no = ${acc_no}, update_datetime = ${dateTime}, bank_name = ${bank_name}, account_name = ${acc_name} WHERE distributor_id = ${dis_id}`;
                con.query(query2);
                
                let query3 = `UPDATE tbl_distributor_bank_master SET type = 'Secondary' WHERE distributor_id = ${dis_id}`;
                con.query(query3);

                let query4 = `INSERT INTO tbl_distributor_bank_master(distributor_id, bank_name, account_no, account_name, branch_name, ifsc_no, type, status, tb_insertdatetime) VALUES ?`;
                let values = [
                    [dis_id, bank_name, acc_no, acc_name, branch_name, ifsc, 'Active', dateTime]
                ];
                con.query(query4, [values]);
            } else {
                let sqlQuery = `INSERT INTO tbl_distributor_bank_master(distributor_id, bank_name, account_no, account_name, branch_name, ifsc_no, type, status, tb_insertdatetime) VALUES ?`;
                let values = [
                    [dis_id, bank_name, acc_no, branch_name, ifsc, bank_type, dateTime]
                ];
                con.query(sqlQuery, [values]);
            }
            response.status = "200";
            response.msg = "Bank Master Details Successfully Added";
        } else{
            response.status = "202";
            response.msg = "Bank Detail Already Exists";
        }
        response.data = [{url:"/profile"}]
    });
    res.end(JSON.stringify(response));
});


// con.end();

module.exports = router;
