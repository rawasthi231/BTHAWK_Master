/**
 * File Name : salesExecutive.js
 * File Type : Express Server Route
 * Creator : Raghvendra Awasthi
 * Version : 1.0
This Router includes routes for 
 * Fetch all details of sales executives
 * Clear FSE Login, Edit FSE Detail, Change FSE Password
 */
const { response } = require('express');
const express = require('express');
const router = express.Router();
const con = require('../db');
const api_helper = require('./API_helper');
const CommonUtility = require('./CommonUtility');
var obj = new CommonUtility();
var date = obj.getDate();
var time = obj.getTime();
var dateTime = date + " " + time;
const SERVER = "http://localhost:5000";
// Route for getting Sales Executive Details
router.post('/get_sales_executive', (req, res) => {
  var response = {}, sqlQuery;
  let reqType = req.body.type;
  if (reqType == 'all_users') {
    let dis_id = req.body.dis_id;
    sqlQuery = `select * from tbl_user where distributor_id='${dis_id}' and status in ('Active','Deactive')`;
  } else if (reqType == 'single_user') {
    let user_id = req.body.user_id;
    sqlQuery = `select * from tbl_user where user_id='${user_id}'`;
  }

  con.query(sqlQuery, (err, row) => {
    if (err) throw err;
    else if (row.length) {
      response.status = "200";
      response.msg = "Details Fetched Successfully";
      response.data = row;
    } else {
      response.status = "402";
      response.msg = "No Data Found";
    }
    res.end(JSON.stringify(response));
  });
});

// Route for clear FSE Login
router.post('/user_imei_clear', (req, res) => {
  var response = {};
  let user_id = req.body.user_id;
  let query1 = `SELECT * FROM tbl_user WHERE user_id = ?`;
  con.query(query1, [user_id], (err, row) => {
    if (err) throw err;
    else if (row.length) {
      let values = [
        [user_id, row[0].imei_no, 'logout', row[0].ip_address, row[0].carrier_name, dateTime]
      ];
      let query2 = `INSERT IGNORE INTO tbl_user_history(user_id,imei_no,type,ip_address,carrier_name,datetime) values ?`;
      con.query(query2, [values], (err, result) => {
        if (err) throw err;
        else if (result.affectedRows >= 1) {
          let query3 = `UPDATE tbl_user SET imei_no = '', ip_address = '', carrier_name = '' WHERE user_id = ? `;
          con.query(query3, [user_id], (err, result) => {
            if (err) throw err;
            else if (result.affectedRows >= 1) {
              response.status = 200;
              response.msg = "User Successfully Logged Out";
            } else {
              response.status = 202;
              response.msg = "User Couldn't be Logged Out";
            }
            res.end(JSON.stringify(response));
          });
        }
      });
    } else {
      response.status = 402;
      response.msg = "Bad Request";
      res.end(JSON.stringify(response));
    }
  });
});

// Route for edit FSE profile
router.post('/update_fse_detail', (req, res) => {
  var response = {};
  let data = req.body;
  try {
    let query1 = `SELECT * FROM tbl_user WHERE user_id = ?`;
    con.query(query1, [data.user_id], (err, row) => {
      if (err) throw err;
      else if (row.length) {
        let query2 = `INSERT IGNORE INTO tbl_user_history(user_id,invoice_type,type,datetime) values ?`;
        let values1 = [
          [row[0].user_id, row[0].invoice_type, 'Invoice Type Change', dateTime]
        ];
        con.query(query2, [values1], (err, result) => {
          if (err) throw err;
          else if (result.affectedRows >= 1) {
            let query3 = `UPDATE tbl_user SET invoice_type = ?, e_recharge_setting = ?, user_name = ? WHERE user_id = ?`;
            con.query(query3, [data.invoice_type, data.e_recharge, data.fse_name, data.user_id], (err, result) => {
              if (err) throw err;
              else if (result.affectedRows >= 1) {
                response.status = "200";
                response.msg = "FSE User Details Updated Successfully";
              } else {
                response.status = "202";
                response.msg = "FSE User Details Couldn't be Updated";
              }
              res.end(JSON.stringify(response));
            });
          }
        });
      } else {
        response.status = "402",
          response.msg = "No User Found";
        res.end(JSON.stringify(response));
      }
    });
  } catch (e) {
    throw e;
  }
});


// Route for Change FSE Password
router.post('/update_fse_password', (req, res) => {
  var response = {};
  try {
    let user_id = req.body.user_id;
    let password = req.body.password;

    let query1 = `SELECT * FROM tbl_user WHERE user_id = ?`;
    con.query(query1, [user_id], (err, row) => {
      if (err) throw err;
      else if (row.length) {
        let query2 = `INSERT INTO tbl_user_history(user_id,password,datetime) VALUES ?`;
        let values = [
          [user_id, password, dateTime]
        ];
        con.query(query2, [values], (err, result) => {
          if (err) throw err;
          else if (result.affectedRows >= 1) {
            let query3 = `update tbl_user set user_password = ? where user_id = ?`;
            con.query(query3, [password, user_id], (err, result) => {
              if (err) throw err;
              else if (result.affectedRows >= 1) {
                response.status = "200";
                response.msg = "Password Changed Successfully";
              } else {
                response.status = "200";
                response.msg = "Password couldn't be changed";
              }
              res.end(JSON.stringify(response));
            });
          }
        });
      } else {
        response.status = "402";
        response.msg = "No User Found";
      }
    });
  } catch (e) {
    throw e;
  }
});


// Route for FSE Stock Return
router.post('/user_stock_return', (req, res) => {
  var response = {};
  try {
    let dis_id = req.body.dis_id;
    let user_id = req.body.user_id;
    let query = `SELECT tbl_product.product_id, tbl_product.product_name, tbl_product.product_price, tbl_product.decimal_category, tbl_user_stock.quantity FROM tbl_product INNER JOIN tbl_user_stock ON tbl_product.product_id = tbl_user_stock.product_id WHERE tbl_product.distributor_id = ? AND tbl_product.product_type IN ('Service','FMCG') AND tbl_user_stock.user_id = ? AND tbl_user_stock.date <= ?`;
    con.query(query, [dis_id, user_id, date], (err, row) => {
      if (err) throw err;
      else if (row.length) {
        response.status = "200";
        response.msg = "Details fetched Successfully";
        response.data = row;
      } else {
        response.status = "402";
        response.msg = "No details found";
        response.data = [];
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});


// Route for FSE Stock Details
router.post('/user_stock_detail', (req, res) => {
  var response = {};
  try {
    let dis_id = req.body.dis_id;
    let user_id = req.body.user_id;
    let type = '';

    let query1 = `SELECT CONCAT("'", REPLACE(work_type, "+", "','"), "'") as work_type FROM tbl_user WHERE user_id = ?`;
    con.query(query1, [user_id], (err, result) => {
      if (err) throw err;
      else if (result.length) {
        type = result[0].work_type;

        let query2 = `SELECT tbl_product.product_id, tbl_product.product_name, tbl_product.product_price, tbl_user_stock.quantity FROM tbl_product INNER JOIN tbl_user_stock ON tbl_product.product_id = tbl_user_stock.product_id WHERE tbl_product.distributor_id = ? AND tbl_product.product_type IN (${type}) AND tbl_user_stock.user_id = ? AND tbl_user_stock.date <= '${date}'`;
        con.query(query2, [dis_id, user_id], (err, row) => {
          if (err) throw err;
          else if (row.length) {
            response.status = "200";
            response.msg = "Details fetched Successfully";
            response.data = row;
          } else {
            response.status = "402";
            response.msg = "No details found";
          }
          res.end(JSON.stringify(response));
        });
      } else {
        response.status = "202";
        response.msg = "No Data Found";
        res.end(JSON.stringify(response));
      }
    });
  } catch (e) {
    throw e;
  }
});

// Route for settle returned user stock
router.post('/update_returned_user_stock', (req, res) => {
  let dis_id = req.body.dis_id;
  let user_id = req.body.user_id;
  let data = req.body.detail;

  data.map((val, index) => {
    if(val.return_quantity != 0){
      let query1 = `SELECT * FROM  tbl_user_stock WHERE date = '${date}' AND user_id = ? AND product_id = ? ORDER BY user_product_id DESC LIMIT 1`;
      con.query(query1, [user_id, val.product_id], (err, row) => {
        if(err) throw err;
        else if(row.length){
          let query2 = `UPDATE tbl_user_stock SET quantity = (quantity - ?) WHERE date = '${date}' AND user_id = ? AND product_id = ?`;
          con.query(query2, [val.return_quantity, user_id, val.product_id]);
        } else {
          let query3 = `SELECT * FROM  tbl_user_stock WHERE date <= '${date}' AND user_id = ? AND product_id = ? ORDER BY user_product_id DESC LIMIT 1`;
          con.query(query3, [user_id, val.product_id], (err, result) => {
            if(err) throw err;
            else if(result.length){
              let query4 = `INSERT INTO tbl_user_stock(user_id, product_id, opening_stock, quantity, date) VALUES ?`;
              let values = [
                [user_id, val.product_id, val.quantity, (val.quantity - val.return_quantity), date]
              ];
              con.query(query4, [values]);
            }
          });
        }
      });
      
      let query5 = `INSERT INTO tbl_distributor_transaction (product_id, distributor_id, quantity,transaction_date, transaction_time, txn_type, user_id) VALUES ?`;
      let values = [
        [val.product_id, dis_id, val.return_quantity, date, time, 'Return', user_id]
      ]    
      con.query(query5, [values]);

      let query6 = `UPDATE tbl_product SET stock_quantity = (stock_quantity + ?) , tb_updatedatetime = '${dateTime}' WHERE product_id = ? AND distributor_id = ?`;
      con.query(query6, [val.return_quantity, val.product_id, dis_id]);

      let query7 = `SELECT closing_stock FROM tbl_distributor_stock WHERE date = '${date}' AND distributor_id = ? AND product_id = ? ORDER BY distributor_stock_id DESC LIMIT 1`;
      con.query(query7, [dis_id, val.product_id], (err, row) => {
        if(err) throw err;
        else if(row.length){
          let query8 = `UPDATE tbl_distributor_stock SET closing_stock = (closing_stock + ?) , time = '${time}' WHERE date = '${date}' AND distributor_id = ? AND product_id = ?`;
          con.query(query8, [val.return_quantity, dis_id, val.product_id]);
        } else{
          let query9 = `SELECT * FROM  tbl_distributor_stock WHERE date <= '${date}' AND distributor_id = ? AND product_id = ? ORDER BY distributor_stock_id DESC LIMIT 1`;
          con.query(query9, [dis_id, val.product_id], (err, row) => {
            if(err) throw err;
            else if(row.length){
              let query10 = `INSERT INTO tbl_distributor_stock (distributor_id, product_id, opening_stock, closing_stock, date, time) VALUES ?`;
              let values = [
                [dis_id, val.product_id, row[0].closing_stock, (row[0].closing_stock + val.return_quantity), date, time]
              ]
              con.query(query10, [values]);
            } else {
              let query11 = `INSERT INTO tbl_distributor_stock(distributor_id, product_id, opening_stock, closing_stock, date, time) VALUES ?`;
              let values = [
                [dis_id, val.product_id, '0', val.return_quantity, date, time]
              ]
              con.query(query11, [values]);
            }
          });
        }
      });
    }
    response.status = "200";
    response.msg = "User Stock Returned Successfully";
    res.end(JSON.stringify(response));
  });
});










// router.post('/update_returned_user_stock', (req, res) => {
//   let dis_id = req.body.dis_id;
//   let user_id = req.body.user_id;
//   let data = req.body.detail;
//   let params = {
//     dis_id: dis_id,
//     user_id: user_id
//   }
//   api_helper.apiCall(`${SERVER}/user_stock_detail`, params)
//     .then(response => {
//       if (data.length) {
//         data.map((val, index) => {
//           if (val.return_quantity != 0) {
//             let info = response.data.find(t => t.product_id == val.product_id);
//             console.log(info);
//             // let newQuantity = val.quantity - val.return_quantity;
//             // let query1 = `UPDATE tbl_user_stock SET quantity = ? WHERE date = ${date} AND user_id = ? AND product_id = ?`;
//             // con.query(query1, [newQuantity, user_id, val.product_id], (err, result) => {
//             //   if (err) throw err;
//             //   else if (result.affectedRows >= 1) {

//             //   }
//             // });
//           }
//         });
//       }

//       res.json(response)
//     })
//     .catch(error => {
//       res.send(error)
//     })

// });



// router.post('/test', (req, res) => {
//   let response = {
//     id : 01,
//     name : "Raghav",
//     age : 24
//   };
//   //console.log(req.body);
//   res.send(req.body);
// });


// router.get('/getAPIResponse', (req, res) => {
//   api_helper.apiCall('http://localhost:5000/user_stock_detail')
//   .then(response => {
//     res.json(response)
//   })
//   .catch(error => {
//       res.send(error)
//   })
// })



module.exports = router;