/**
 * File Name : category.js
 * File Type : Express Server Route
 * Creator : Raghvendra Awasthi
 * Version : 1.0
This Router includes routes for 
 * Add New Category & Sub Category, Edit Existing Category & Sub Category, View All Category & Sub Category.
 */
const express = require('express');
const router = express.Router();
const con = require('../db');
const CommonUtility = require('./CommonUtility');

var obj = new CommonUtility();
var date = obj.getDate();
var time = obj.getTime();
var dateTime = date + " " + time;
let response = {};

// Route for creating new category 
router.post('/add_category', (req, res) => {
  let dis_id = req.body.dis_id;
  let cat_name = req.body.cat_name;
  try {
    let values = [
      [dis_id, cat_name, 'Active', date, time]
    ];

    let sqlQuery = `INSERT IGNORE INTO tbl_product_category_master(distributor_id, category_name, status, insert_date, insert_time) VALUES ?`;

    con.query(sqlQuery, [values], (err, result) => {
      if (err) throw err;
      else if(result.affectedRows>=1) {
        response.status = "200";
        response.msg = "Category Successfully Created";
      } else {
        response.status = "402";
        response.msg = "Category Creation Failed";
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});

// Route for getting all category of specific distributor
router.post('/get_category', (req, res) => {
  let dis_id = req.body.dis_id;
  let sqlQuery = `SELECT category_id, category_name, status FROM tbl_product_category_master WHERE distributor_id = '${dis_id}' AND status IN ('Active','Deactive') ORDER BY category_id ASC`;

  try {
    con.query(sqlQuery, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        response.status = "200";
        response.msg = "Data Successfully Fetched";
        response.data = row;
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

// Route for edit specific category
router.post('/edit_category', (req, res) => {
  let cat_id = req.body.cat_id;
  let cat_name = con.escape(req.body.cat_name);

  let query1 = `SELECT * FROM  tbl_product_category_master where category_id = ${cat_id}`;
  try {
    con.query(query1, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        let values = [
          [row[0].category_id, row[0].distributor_id, row[0].category_name, row[0].status, row[0].insert_date, row[0].insert_time]
        ];
        let query2 = `INSERT IGNORE INTO tbl_product_category_master_history(category_id, distributor_id, category_name, status, insert_date, insert_time) VALUES ?`;
        con.query(query2, [values]);
      }
    });

    let query3 = `UPDATE tbl_product_category_master SET category_name = ${cat_name}, update_datetime = '${dateTime}' WHERE category_id = ${cat_id}`;
    con.query(query3, (err, result) => {
      if (err) throw err;
      else {
        response.status = "200";
        response.msg = "Category Name Successfully Updated";
        res.end(JSON.stringify(response));
      }
    });
  } catch (e) {
    throw e;
  }
});

// Route for change product category status
router.post('/change_status', (req, res) => {
  let response = {};
  let cat_id = req.body.cat_id;
  let status = req.body.status;
  let query1, query2, query3, values;
  query1 = `SELECT * FROM tbl_product_category_master WHERE category_id = ${cat_id}`;

  if (status == 'Active') {
    query2 = `UPDATE tbl_product_category_master SET status = 'Deactive', update_datetime = '${dateTime}' WHERE category_id = ${cat_id}`;
  } else {
    query2 = `UPDATE tbl_product_category_master SET status = 'Active', update_datetime = '${dateTime}' WHERE category_id = ${cat_id}`;
  }
  con.query(query2, (err, result) => {
    if (err) throw err;
    else if (result.affectedRows) {
      con.query(query1, (err, row) => {
        if (err) throw err;
        else if (row.length) {
          let values = [
            [row[0].category_id, row[0].distributor_id, row[0].category_name, row[0].status, row[0].insert_date, row[0].insert_time]
          ];
          let query3 = `INSERT IGNORE INTO tbl_product_category_master_history(category_id, distributor_id, category_name, status, insert_date, insert_time) VALUES ?`;
          con.query(query3, [values]);
        }
      });
      
      response.status = "200";
      response.msg = "Category status has changed."
    } else {
      response.status = "202";
      response.msg = "Category status couldn't be changed."
    }
    res.end(JSON.stringify(response));
  });
});

// Route for add new Sub Category
router.post('/add_sub_category', (req, res) => {
  let cat = req.body.cat_id;
  let sub_cat = req.body.sub_cat_name;
  var response = {};
  try {
    let searchQuery = `SELECT * FROM  tbl_product_subcategory_master WHERE subcategory_name = ${con.escape(sub_cat)} AND category_id = ${cat}`;
    con.query(searchQuery, (err, result) => {
      if (err) throw err;
      else if (result.length) {
        response.status = "202";
        response.msg = 'Sub Category is already exists!';
      } else {
        let values = [[cat, sub_cat, 'Active', date, time]];
        let sqlQuery = `INSERT IGNORE INTO tbl_product_subcategory_master (category_id, subcategory_name,  status, insert_date, insert_time) VALUES ?`;

        con.query(sqlQuery, [values], (err, result) => {
          if (err) throw err;
          else if(result.affectedRows>=1) {
            response.status = "200";
            response.msg = "Sub Category Successfully Created";
          } else {
            response.status = "402";
            response.msg = "Sub Category Creation Failed";
          }
        });
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});

// Route for get all sub categories
router.post('/get_subcategory', (req, res) => {
  let dis_id = req.body.dis_id;

  try {
    let sqlQuery = `SELECT tbl_product_category_master.category_name, tbl_product_subcategory_master.subcategory_id, tbl_product_subcategory_master.subcategory_name, tbl_product_subcategory_master.status FROM tbl_product_category_master INNER JOIN tbl_product_subcategory_master on tbl_product_category_master.category_id = tbl_product_subcategory_master.category_id WHERE tbl_product_category_master.distributor_id = ${dis_id}`;

    con.query(sqlQuery, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        response.status = "200";
        response.msg = "Data Successfully Fetched";
        response.data = row;
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


// Route for edit specific Sub Category
router.post('/edit_subcategory', (req, res) => {
  let sub_cat_id = req.body.sub_cat_id;
  let cat_id = req.body.cat_id;
  let sub_cat_name = con.escape(req.body.sub_cat_name);

  try {
    let query1 = `SELECT * FROM  tbl_product_subcategory_master where subcategory_id = ${cat_id}`;
    con.query(query1, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        let values = [
          [row[0].subcategory_id, row[0].category_id, row[0].subcategory_name, row[0].status, row[0].insert_date, row[0].insert_time]
        ];
        let query2 = `INSERT IGNORE INTO tbl_product_subcategory_master_history(subcategory_id, category_id, subcategory_name, status, insert_date, insert_time) VALUES ?`;
        con.query(query2, [values]);
      }
    });

    let query3 = `UPDATE tbl_product_subcategory_master SET category_id = ${cat_id}, subcategory_name = ${cat_name}, update_datetime = '${dateTime}' WHERE subcategory_id = ${sub_cat_id}`;
    con.query(query3, (err, result) => {
      if (err) throw err;
      else {
        response.status = "200";
        response.msg = "Sub Category Name Successfully Updated";
        res.end(JSON.stringify(response));
      }
    });
  } catch (e) {
    throw e;
  }
});

// Route for get Sub Category based on category id
router.post('/get_sub_cat', (req, res) => {
  let cat_id = req.body.cat_id;
  let sqlQuery = `SELECT subcategory_id, subcategory_name FROM tbl_product_subcategory_master WHERE category_id = ${cat_id} AND  status = 'Active'`;

  con.query(sqlQuery, (err, row) => {
    if(err) throw err;
    else if(row.length){
      response.status = "200";
      response.msg = "Subcategory Fetched Successfully";
      response.data = row;
    } else {
      response.status = "200";
      response.msg = "No Subcategory Found";
    }
    res.end(JSON.stringify(response));
  });
});




// Route for change product category status
router.post('/change_status_subcategory', (req, res) => {
  let response = {};
  let subCat_id = req.body.subCat_id;
  let status = req.body.status;
  let query1, query2, query3,values;
  try {
    query1 = `SELECT * FROM tbl_product_subcategory_master WHERE subcategory_id = ${subCat_id}`;
    
    if (status == 'Active') {
      query2 = `UPDATE tbl_product_subcategory_master SET status = 'Deactive', update_datetime = '${dateTime}' WHERE subcategory_id = ${subCat_id}`;
    } else {
      query2 = `UPDATE tbl_product_subcategory_master SET status = 'Active', update_datetime = '${dateTime}' WHERE subcategory_id = ${subCat_id}`;
    }
    
    con.query(query2, (err, result) => {
      if (err) throw err;
      else if (result.affectedRows) {
        /*Making history of the current entry */
        con.query(query1, (err, row) => {
          if (err) throw err;
          else if (row.length) {
            query3 = `INSERT IGNORE INTO tbl_product_subcategory_master_history (subcategory_id, category_id, subcategory_name, status, insert_date, insert_time) VALUES ?`;
            values = [
              [row[0].subcategory_id, row[0].category_id, row[0].subcategory_name, row[0].status, row[0].insert_date, row[0].insert_time]
            ];
            con.query(query3, [values]);
          }
        });

        response.status = "200";
        response.msg = "Sub Category status has changed."
      } else {
        response.status = "202";
        response.msg = "Sub Category status couldn't be changed."
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});




//con.end();


module.exports = router;