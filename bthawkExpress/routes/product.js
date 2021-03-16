/**
 * File Name : product.js
 * File Type : Express Server Route
 * Creator : Raghvendra Awasthi
 * Version : 1.0
This Router includes routes for 
 * Add New Products, Edit Existing Products, View All Products.
 * Add New Packet Bag, View All Packet Bags
 */
const express = require('express');
const { type } = require('jquery');
const router = express.Router();
const con = require('../db');
const empty = require('./checkEmpty');
const CommonUtility = require('./CommonUtility');
var response = {};
var obj = new CommonUtility();
var date = obj.getDate();
var time = obj.getTime();
var dateTime = date + " " + time;


// Route for get all products of specific distributor
router.post('/get_products', (req, res) => {
  let dis_id = req.body.dis_id;
  //let pro_type = con.escape(req.query.pro_type);
  try {
    let sqlQuery = `SELECT tbl_product.*,tbl_product_subcategory_master.subcategory_name as sub_cat ,tbl_product_category_master.category_name as cat FROM tbl_product, tbl_product_category_master,tbl_product_subcategory_master where tbl_product_category_master.category_id = tbl_product.category_id AND tbl_product_subcategory_master.subcategory_id = tbl_product.subcategory_id AND tbl_product.distributor_id=${dis_id}`;
    //let sqlQuery = `SELECT * FROM tbl_product WHERE distributor_id=${dis_id} AND product_type=${pro_type}`;
    con.query(sqlQuery, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        response.status = "200";
        response.msg = "Product Details Fetched Successfully.";
        response.data = row;
      } else {
        response.status = "202";
        response.msg = "No Product Found";
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});

//Route for Get Single Product Details
router.post('/get_single_product', (req, res) => {
  let p_id = req.body.p_id;
  try {
    let sqlQuery = `SELECT * FROM tbl_product where product_id = ${p_id}`;
    con.query(sqlQuery, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        response.status = "200";
        response.msg = "Product Details Fetched Successfully.";
        response.data = row[0];
      } else {
        response.status = "202";
        response.msg = "No Product Found";
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});


// Route for Adding New Product
router.post('/add_product', (req, res) => {
  try {
    let formData = req.body;
    let dis_id = formData.dis_id;
    let cat_id = formData.category;
    let sub_cat_id = formData.subCategory;
    let pro_name = formData.pName;
    let pro_type = formData.productType;
    let maintain_inventory = (!obj.empty(formData.maintaineInventory)) ? formData.maintaineInventory : '';
    let item_type = (!obj.empty(formData.itemType)) ? formData.itemType : '';
    let c_raw_product = formData.consumableRawProduct;
    let barcode_generate = (!obj.empty(formData.barcode_generate)) ? formData.barcode_generate : '';
    let pro_barcode = (!obj.empty(formData.pro_barcode)) ? formData.pro_barcode : '';
    let gst_applicable = formData.gstApplicable;
    let gst_per = 0, cgst = 0, sgst = 0;

    if (gst_applicable == 'Yes') {
      gst_per = parseFloat(formData.gstPer);
      cgst = (gst_per / 2).toFixed(2);
      sgst = (gst_per / 2).toFixed(2);
    } else {
      gst_per = 0;
      cgst = 0;
      sgst = 0;
    }

    let sale_price = formData.salePrice;
    let pur_price_inc = formData.inclusivePrice;
    let pur_price_exc = formData.exclusivePrice;
    let dealer_price = formData.dealerPrice;
    let mrp = (!obj.empty(formData.mrpPrice)) ? formData.mrpPrice : '';
    let alias = formData.alias;
    let hsn_code = formData.hsnCode;
    let measure_unit = formData.measurementUnit;
    let decimal_qty = formData.decimalQty;
    let disc_applicable = formData.discountApplicable;
    let cess_applicable = (!obj.empty(formData.cessApplicable)) ? formData.cessApplicable : 'No';
    let cess_on_sale = (!obj.empty(formData.cessOnSale)) ? formData.cessOnSale : 'No';
    let cess_on_purchase = (!obj.empty(formData.cessOnPurchase)) ? formData.cessOnPurchase : 'No';
    let low_stock_qty = formData.lowStockQty;
    let discount_per = formData.discountPer;
    let discount_amt = (pur_price_inc * discount_per) / 100;
    let cess_amount = formData.cessAmt;
    let cess_per = (!obj.empty(formData.cessDisc)) ? formData.cessDisc : '';

    let values = [
      [dis_id, pro_name, cat_id, sub_cat_id, sale_price, dealer_price, pro_type, pur_price_inc, mrp, pur_price_exc, disc_applicable, discount_per, discount_amt, cess_applicable, cess_on_sale, cess_on_purchase, cess_amount, cess_per, low_stock_qty, decimal_qty, alias, hsn_code, 'General', item_type, maintain_inventory, c_raw_product, barcode_generate, pro_barcode, measure_unit, gst_applicable, cgst, sgst, gst_per, dateTime]
    ];

    let sqlQuery = `INSERT IGNORE INTO tbl_product(distributor_id, product_name, category_id,subcategory_id, product_price, dealer_price, product_type, purchase_price, mrp_price, purchase_price_exc, discount_applicable, discount_percentage, discount_amount, cess_applicable, cess_on_sale, cess_on_purchase, cess_pc_amt, cess_percentage, low_stock_quantity, decimal_category, alias, hsn_code, parent_group, item_type, maintain_inventory, consumable_raw_product, barcode_generator, product_barcode, unit, gst_applicable, CGST, SGST, IGST, tb_insertdatetime)values ?`;

    con.query(sqlQuery, [values], (err, row) => {
      if (err) throw err;
      else if (row.affectedRows >= 1) {
        response.status = "200";
        response.msg = "Product Successfully Added.";
        //response.url = `product-consume-raw-detail.php?pid=${btoa(row.insertId)}`
      } else {
        response.status = "202";
        response.msg = "Product Details Couldn't be added.";
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});

// Route for edit specific product
router.post('/edit_product', (req, res) => {
  try {
    let formData = req.body.formData;
    let product_id = formData.product_id;
    let pro_name = formData.pName;
    let maintain_inventory = (!obj.empty(formData.maintaineInventory)) ? formData.maintaineInventory : '';
    let item_type = (!obj.empty(formData.itemType)) ? formData.itemType : '';
    let c_raw_product = formData.consumableRawProduct;
    let gst_applicable = formData.gstApplicable;
    let gst_per = 0, cgst = 0, sgst = 0;

    if (gst_applicable == 'Yes') {
      gst_per = parseFloat(formData.gstPer);
      cgst = (gst_per / 2).toFixed(2);
      sgst = (gst_per / 2).toFixed(2);
    } else {
      gst_per = 0;
      cgst = 0;
      sgst = 0;
    }

    let sale_price = formData.salePrice;
    let pur_price_inc = formData.inclusivePrice;
    let pur_price_exc = formData.exclusivePrice;
    let dealer_price = formData.dealerPrice;
    let mrp = (!obj.empty(formData.mrpPrice)) ? formData.mrpPrice : '';
    let alias = formData.alias;
    let hsn_code = formData.hsnCode;
    let measure_unit = formData.measurementUnit;
    let decimal_qty = formData.decimalQty;
    let disc_applicable = formData.discountApplicable;
    let cess_applicable = (!obj.empty(formData.cessApplicable)) ? formData.cessApplicable : 'No';
    let cess_on_sale = (!obj.empty(formData.cessOnSale)) ? formData.cessOnSale : 'No';
    let cess_on_purchase = (!obj.empty(formData.cessOnPurchase)) ? formData.cessOnPurchase : 'No';
    let low_stock_qty = formData.lowStockQty;
    let discount_per = formData.discountPer;
    let discount_amt = (pur_price_inc * discount_per) / 100;
    let cess_amount = formData.cessAmt;
    let cess_per = (!obj.empty(formData.cessDisc)) ? formData.cessDisc : '';

    let sqlQuery = `UPDATE tbl_product SET product_name = '${pro_name}', maintain_inventory = '${maintain_inventory}', item_type = '${item_type}', consumable_raw_product = '${c_raw_product}', gst_applicable = '${gst_applicable}', CGST = '${cgst}', SGST = '${sgst}', IGST = '${gst_per}', product_price = '${sale_price}', purchase_price = '${pur_price_inc}', purchase_price_exc = '${pur_price_exc}', dealer_price = '${dealer_price}', mrp_price = '${mrp}', alias = '${alias}', hsn_code = '${hsn_code}', measurement_value = '${measure_unit}', decimal_category = '${decimal_qty}', discount_applicable = '${disc_applicable}', cess_applicable = '${cess_applicable}', cess_on_sale = '${cess_on_sale}', cess_on_purchase = '${cess_on_purchase}', low_stock_quantity = '${low_stock_qty}', discount_amount = '${discount_amt}', cess_pc_amt = '${cess_amount}', cess_percentage = '${cess_per}', tb_updatedatetime = '${dateTime}' WHERE product_id = '${product_id}'`;

    con.query(sqlQuery, (err, result) => {
      if (err) throw err;
      else if (result.affectedRows>=1) {
        response.status = "200";
        response.msg = "Updation Successful";
      } else {
        response.status = "202";
        response.msg = "Updation Failed";
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});

// router.post('/edit_product', (req, res) => {
//   let product_id = req.body.product_id;
//   let field = con.escape(req.body.field);
//   let value = con.escape(req.body.value);

//   try {

//     let sqlQuery = `UPDATE tbl_product SET ${field} = ${value}, tb_updatedatetime = ${dateTime} WHERE product_id = ${product_id}`;

//     con.query(sqlQuery, (err, result) => {
//       if (err) throw err;
//       else if (row.affectedRows === 1) {
//         response.status = "200";
//         response.msg = "Updation Successful.";
//       }
//       res.end(JSON.stringify(response));
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// Route for change product status
router.post('/change_product_status', (req, res) => {
  try {
    let p_id = req.body.p_id;
    let status = req.body.status;
    let sqlQuery = '';
    if (status == 'Active') {
      sqlQuery = `UPDATE tbl_product SET status = 'Deactive', tb_updatedatetime = '${dateTime}' WHERE product_id = ${p_id}`;
    } else {
      sqlQuery = `UPDATE tbl_product SET status = 'Active', tb_updatedatetime = '${dateTime}' WHERE product_id = ${p_id}`;
    }

    con.query(sqlQuery, (err, result) => {
      if (err) throw err;
      else if (result.affectedRows >= 1) {
        response.status = "200";
        response.msg = "Status Updated Successfully";
      } else {
        response.status = "202";
        response.msg = "Status Updation Failed";
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});

// Route for configure new Packet Bag
router.post('/add_pkt_bag', (req, res) => {
  let dis_id = req.body.dis_id;
  let bag_qty = req.body.bag_qty;
  try {
    let query1 = `SELECT * FROM  tbl_distributor_bag_detail WHERE bag_qty = ${bag_qty} and distributor_id = ${dis_id}`;
    con.query(query1, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        let query2 = `INSERT IGNORE INTO tbl_distributor_bag_detail (distributor_id, bag_qty, status, insert_datetime) VALUES ?`;
        let values = [
          [dis_id, bag_qty, 'Active', date]
        ];
        con.query(query2, [values], (err, result) => {
          if (err) throw err;
          else if (result.affectedRows === 1) {
            response.status = "200";
            response.msg = "Packet Bag Successfully Inserted";
          } else {
            response.status = "402";
            response.msg = "Bag already exists";
          }
          response.data = [{ "url": "pkt_bag_detail" }];
          res.end(JSON.stringify(response));
        });
      }
    });
  } catch (e) {
    throw e;
  }
});


// Route for getting all Packet Bag details of specific Distributor
router.post('/get_pkt_bag', (req, res) => {
  let dis_id = req.body.dis_id;
  try {
    let sqlQuery = `SELECT * FROM tbl_distributor_bag_detail WHERE distributor_id = ${dis_id} AND status IN ('Active','Deactive') ORDER BY bag_qty ASC`;
    con.query(sqlQuery, (err, row) => {
      if (err) throw err;
      else if (row.length) {
        response.status = "200";
        response.msg = "Packet Bag Details Fetched Successfull";
        response.data = row;
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});


// Route for change Packet Bag status
router.post('/change_status_pkt_bag', (req, res) => {
  let response = {};
  let bag_id = req.body.bag_id;
  let status = req.body.status;
  let sqlQuery;
  try {
    if (status == 'Active') {
      sqlQuery = `UPDATE tbl_distributor_bag_detail SET status = 'Deactive', update_datetime = '${dateTime}' WHERE bag_id = ${bag_id}`;
    } else {
      sqlQuery = `UPDATE tbl_distributor_bag_detail SET status = 'Active', update_datetime = '${dateTime}' WHERE bag_id = ${bag_id}`;
    }

    con.query(sqlQuery, (err, result) => {
      if (err) throw err;
      else if (result.affectedRows) {
        response.status = "200";
        response.msg = "Pkt/Bag status has changed."
      } else {
        response.status = "202";
        response.msg = "Pkt/Bag status couldn't be changed."
      }
      res.end(JSON.stringify(response));
    });
  } catch (e) {
    throw e;
  }
});



//con.end();

module.exports = router;