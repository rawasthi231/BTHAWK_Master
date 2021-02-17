const express = require('express');
const router = express.Router();
const con = require('../db');

router.post('/distributor_profile', (req, res) => {
    let dis_id = req.query.dis_id;
    let sqlQuery = `SELECT * FROM tbl_distributor WHERE distributor_id = '${dis_id}'`;
    //console.log(sqlQuery);
    var response;
    con.query(sqlQuery, (err, row) => {
        if (err) throw err;
        else if (row.length)
        res.end(row[0]);
        else res.end('No data found');
    });
});

module.exports = router;
