const express = require('express');
const router = express.Router();
const con = require('../db');

var getDate = () => {
    var dateObj = new Date();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    month = (month.toString().length == 1) ? "0" + month : month;
    let year = dateObj.getFullYear();
    let date = year + '-' + month + '-' + day;
    return date;
}

var getTime = () => {
    var dateObj = new Date();
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    let sec = dateObj.getSeconds();

    hour = (hour.toString().length == 1) ? "0" + hour : hour;
    min = (min.toString().length == 1) ? "0" + min : min;
    sec = (sec.toString().length == 1) ? "0" + sec : sec;
    let time = hour + ':' + min + ':' + sec;
    return time;
}

router.get('/category', (req, res) => {
    let dis_id = req.query.distributor_id;
    let cat_name = req.query.category_name;
    let date = getDate();
    let time = getTime();

    let values = [
        [dis_id, cat_name, 'Active', date, time]
    ];

    let sqlQuery = `INSERT INTO tbl_product_category_master(distributor_id, category_name, status, insert_date, insert_time) VALUES ?`;

    con.query(sqlQuery, [values], (err, result) => {
        if (err) throw err;
        else {
            console.log(result.affectedRows);
            res.send("Rows Affected :- " + result.affectedRows);
        }
    });
});

router.post('/sub_category', (req, res) => {
    let cat = req.query.cat_name;
    let sub_cat = req.query.sub_cat_name;
    let date = getDate();
    let time = getTime();

    con.query(`SELECT * FROM  tbl_product_category_master WHERE subcategory_name = '${sub_cat}' AND category_id = '${cat}'`, (err, result) => {
        if (err) throw err;
        else if (result.length){
            res.send('Sub Category is already created!');    
        } else {
            let values = [
                [cat, sub_cat, 'Active', date, time]
            ];

            let sqlQuery = `INSERT INTO tbl_product_subcategory_master (distributor_id, category_name, status, insert_date, insert_time) VALUES ?`;

            con.query(sqlQuery, [values], (err, result) => {
                if (err) throw err;
                else {
                    console.log(result.affectedRows);
                    res.send("Rows Affected :- " + result.affectedRows);
                }
            });
        }
    });
});

module.exports = router;