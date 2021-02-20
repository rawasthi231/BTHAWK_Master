const express = require('express');
const router = express.Router();
const con = require('../db');
var response = {};

// Route for fetching details of logged in distributor
router.post('/distributor_profile', (req, res) => {
    let dis_id = req.body.dis_id;
    let sqlQuery = `SELECT * FROM tbl_distributor WHERE distributor_id = '${dis_id}'`;
    con.query(sqlQuery, (err, row) => {
        if (err) throw err;
        else if (row.length){
            response.status = "200";
            response.msg = "Distributor Details Successfully Fetched";
            response.data = row[0];
        } else{
            response.status = "202";
            response.msg = "No data found";  
        } 
        res.end(JSON.stringify(response));
    });
});

module.exports = router;
