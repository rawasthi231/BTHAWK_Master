/**
 * File Name : payout.js
 * File Type : Express Server Route
 * Creator : Raghvendra Awasthi
 * Version : 1.0
This Router includes routes for 
 * Add New Payouts for product or purchase.
 */

const express = require('express');
const router = express.Router();
const con = require('../db');
const CommonUtility = require('./CommonUtility');
var response = {};
var obj = new CommonUtility();
var date = obj.getDate();
var time = obj.getTime();
var dateTime = date+" "+time;




