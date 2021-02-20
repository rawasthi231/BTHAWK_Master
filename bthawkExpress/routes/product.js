/**
 This Router includes routes for 
 * Add New Products, Edit Existing Products, View All Products.
 * Add New Packet Bag, View All Packet Bags
 */
const express = require('express');
const router = express.Router();
const con = require('../db');
const empty = require('./checkEmpty');
const CommonUtility = require('./CommonUtility');
var response = {};
var obj = new CommonUtility();
var dateTime = obj.getDate()+" "+obj.getTime();
var date = obj.getDate();

// Route for get all products of specific distributor
router.get('/get_products', (req, res) => {
    let dis_id = req.query.dis_id;
    let pro_type = con.escape(req.query.pro_type);
    let sqlQuery = `SELECT * FROM tbl_product WHERE distributor_id=${dis_id} AND product_type=${pro_type}`;
    con.query(sqlQuery, (err, row) => {
        if(err) throw err;
        else if(row.length){
            response.status = "200";
            response.msg = "Product Details Fetched Successfully.";
            response.data = row;
        } else {
            response.status = "202";
            response.msg = "No Product Found";
        }
        res.end(JSON.stringify(response));
    });
});


// Route for Adding New Product
router.get('/add_product', (req, res) => {
    let dis_id = req.body.dis_id;
    let cat_id = req.body.cat_id;
    let sub_cat_id = req.body.sub_cat_id;
    let pro_name = req.body.pro_name;
    let pro_type = req.body.pro_type;
    let maintain_inventory = (!obj.empty(req.body.maintain_inventory)) ? req.body.maintain_inventory : '';
    let item_type = (!obj.empty(req.body.item_type)) ? req.body.item_type : '';
    let c_raw_product = req.body.c_raw_product;
    let barcode_generate = (!obj.empty(req.body.barcode_generate)) ? req.body.barcode_generate : '';
    let pro_barcode = (!obj.empty(req.body.pro_barcode)) ? req.body.pro_barcode : '';
    let gst_applicable = req.body.gst_applicable;
    let gst_per = 0, cgst= 0, sgst = 0 ;
    if(gst_applicable == 'Yes'){
        gst_per = req.body.gst_per;
        cgst = (gst_per/2).toFixed(2);
        sgst = (gst_per/2).toFixed(2);
    } 
    let sale_price = req.body.sale_price;
    let pur_price_inc = req.body.pur_price_inc;
    let pur_price_exc = req.body.pur_price_exc;
    let dealer_price = req.body.dealer_price;
    let mrp = (!obj.empty(req.body.mrp)) ? req.body.mrp : '';
    let alias = req.body.alias;
    let hsn_code = req.body.hsn_code;
    let measure_unit = req.body.measure_unit;
    let decimal_qty = req.body.decimal_qty;
    let disc_applicable = req.body.disc_applicable;
    let cess_applicable = (!obj.empty(req.body.cess_applicable)) ? req.body.cess_applicable : '';
    let low_stock_qty = req.body.low_stock_qty;
    let discount = req.body.discount;
    let cess_amount = req.body.cess_amount;
    let cess_per = (!obj.empty(req.body.cess_discount)) ? req.body.cess_discount : '';
    


    let values = [
        [dis_id, pro_name, cat_id, sub_cat_id, sale_price, dealer_price, pro_type, pur_price_inc, mrp, pur_price_exc, disc_applicable, discount, cess_applicable, cess_amount, cess_per, low_stock_qty, decimal_qty, alias, hsn_code, 'General', item_type, maintain_inventory, c_raw_product, barcode_generate, pro_barcode, measure_unit, gst_applicable, cgst, sgst, gst_per, dateTime]
    ];

    let sqlQuery = `INSERT IGNORE INTO tbl_product(distributor_id, product_name, category_id,subcategory_id, product_price, dealer_price, product_type, purchase_price, mrp_price, purchase_price_exc, discount_applicable, discount_percentage, discount_amount, cess_applicable, cess_pc_amt, cess_percentage, low_stock_quantity, decimal_category, alias, hsn_code, parent_group, item_type, maintain_inventory, consumable_raw_product, barcode_generator, product_barcode, unit, gst_applicable, CGST, SGST, IGST, tb_insertdatetime)values ?`;

    con.query(sqlQuery, [values], (err, row) => {
        if(err) throw err;
        else if(row.affectedRows === 1) {
            response.status = "200";
            response.msg = "Product Successfully Added.";
            response.url = `product-consume-raw-detail.php?pid=${btoa(row.insertId)}`
        }        
        res.end(JSON.stringify(response));
    });
    
});


// Route for edit specific product
router.post('/edit_product', (req, res) => {
    let product_id = req.body.product_id;
    let field = con.escape(req.body.field);
    let value = con.escape(req.body.value);

    let sqlQuery = `UPDATE tbl_product SET ${field} = ${value}, tb_updatedatetime = ${dateTime} WHERE product_id = ${product_id}`; 

    con.query(sqlQuery, (err, result) => {
        if(err) throw err;
        else  if(row.affectedRows === 1) {
            response.status = "200";
            response.msg = "Updation Successful.";
        }        
        res.end(JSON.stringify(response));
    });
});


// Route for configure new Packet Bag
router.post('/add_pkt_bag', (req, res) => {
    let dis_id = req.body.dis_id;
    let bag_qty = req.body.bag_qty;

    let query1 = `SELECT * FROM  tbl_distributor_bag_detail WHERE bag_qty = ${bag_qty} and distributor_id = ${dis_id}`;
    con.query(query1, (err, row) => {
        if(err) throw err;
        else if(row.length){
            let query2 = `INSERT INTO tbl_distributor_bag_detail (distributor_id, bag_qty, status, insert_datetime) VALUES ?`;
            let values = [
                [dis_id, bag_qty, 'Active', date]
            ];
            con.query(query2, [values], (err, result) => {
                if(err) throw err;
                else if(result.affectedRows===1){
                    response.status = "200";
                    response.msg = "Packet Bag Successfully Inserted";
                    response.data = {"url" : "pkt_bag_detail"}
                } else{
                    response.status = "402";
                    response.msg = "Bag already exists";
                    response.data = {"url" : "pkt_bag_detail"}
                }
                res.end(JSON.stringify(response));
            });

        }
    });
});


// Route for getting all Packet Bag details of specific Distributor
router.post('/get_pkt_bag', (req, res) => {
    let dis_id = req.body.dis_id;

    let sqlQuery = `SELECT * FROM tbl_distributor_bag_detail WHERE distributor_id = ${dis_id} AND status IN ('Active','Deactive') ORDER BY bag_qty ASC`;

    con.query(sqlQuery, (err, row) => {
        if(err) throw err;
        else if(row.length){
            response.status = "200";
            response.msg = "Packet Bag Details Fetched Successfull";
            response.data = row;
        }
    });
});

module.exports = router;