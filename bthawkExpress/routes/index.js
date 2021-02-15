var express = require('express');
var router = express.Router();
var httpMsgs = require('http-msgs');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
var con = require('../db');
//const { expr } = require('jquery');
var app = express();

//headers.append(Access-Control-Allow-Origin);
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  var output = {};
  var data = {};
  let requestFrom = req.body.request;
  res.header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
  if (requestFrom == 'Web') {
    var sessionData = [];
    let email = con.escape(req.body.uName);
    let password = req.body.uPass;
    try {
      let query = `select * from tbl_distributor_users WHERE status='Active' AND distributor_email = ${email} AND password = '${password}'`;
      con.query(query, (error, result) => {
        if (error) throw error;
        else if (result.length) {
          let dis_usr_id = result[0].distributor_user_id;
          let dis_id = result[0].distributor_id;
          let user_role = result[0].user_role;
          let timestamp = Math.floor(new Date().getTime() / 1000);
          var str_shuffle = (string) => {
            var chars = string.split('');
            for (var i = chars.length; i > 0;) {
              let random = parseInt(Math.random() * i);
              let temp = chars[--i];
              chars[i] = chars[random];
              chars[random] = temp;
            }
            return chars.join('');
          }
          var session_id = str_shuffle('0123456789abcdefghijklmnopqrstuvwxyz');
          
          res.send('Data Received');
          
          
          if (result[0].session_id == "") {
            let updateQuery = `UPDATE tbl_distributor_users SET login_datetime='${timestamp}',session_id='${session_id}',activity_time='${timestamp}' where distributor_user_id='${dis_usr_id}'`;
            con.query(updateQuery);
            con.query(`Select * from tbl_distributor where distributor_id='${dis_id}'`, (err, info) => {
              if (err) throw err;
              else if (info.length) {
                let flag = true;
                let dis_cat = info[0].distributor_category;
                // Setting up session variable for Serial No. Distributor Category 
                if ((dis_cat.indexOf("Serial No") >= 0))
                  sessionData['serialno_sale'] = "Yes";
                else
                  sessionData['serialno_sale'] = "No";

                let custom_module = info[0].custom_module;
                let AGRO_type = info[0].AGRO_type;
                let job_work_type = info[0].job_work;
                let stone_crusher_type = info[0].stone_crusher;
                if (custom_module == 'Yes') {
                  sessionData = { 'custm_session_dist_id': dis_id, 'custm_dis_user_id': dis_usr_id, 'user_role': user_role };
                  //sessionData.push({"custom_module": { 'custm_session_dist_id': dis_id, 'custm_dis_user_id': dis_usr_id, 'user_role': user_role } });
                } else if (job_work_type == 'Yes') {
                  sessionData = { 'jobwork_user_id': dis_id, 'jobwork_dis_user_id': dis_usr_id, 'jobwork_user_role': user_role };
                  //sessionData.push({"job_work": { 'jobwork_user_id': dis_id, 'jobwork_dis_user_id': dis_usr_id, 'jobwork_user_role': user_role } });
                } else if (AGRO_type == 'Yes') {
                  sessionData = { 'agro_user_id': dis_id, 'agro_dis_user_id': dis_usr_id, 'agro_user_role': user_role };
                  //sessionData.push({"AGRO_type": {'agro_user_id': dis_id, 'agro_dis_user_id': dis_usr_id, 'agro_user_role': user_role } });
                } else if (stone_crusher_type == 'Yes') {
                  sessionData = { 'stone_session_dist_id': dis_id, 'stone_dis_user_id': dis_usr_id, 'user_role': user_role };
                  //sessionData.push({"stone_crusher": {'stone_session_dist_id': dis_id, 'stone_dis_user_id': dis_usr_id, 'user_role': user_role } });
                }
                else {
                  sessionData = { 'session_dist_id': dis_id, 'dis_user_id': dis_usr_id, 'user_role': user_role };
                  //sessionData.push({ "other": {'session_dist_id': dis_id, 'dis_user_id': dis_usr_id, 'user_role': user_role }});
                }
                sessionData.user_session = session_id;
                if (flag) {
                  if (stone_crusher_type == 'Yes')
                    header = { "url": "stone_module/dashboard" };
                  else if (custom_module == 'Yes')
                    header = { "url": "custom_module/dashboard" };
                  else if (job_work_type == 'Yes')
                    header = { "url": "job_work/dashboard" };
                  else if (AGRO_type == 'Yes')
                    header = { "url": "AGRO/dashboard" };
                  else
                    header = { "url": "dashboard" };
                }

                data = {"header": header, "session": sessionData};
                output = {
                  "status": 200,
                  "msg": "Fetch Successfull",
                  "data": data
                }
                res.end(JSON.stringify(output));
              } else{
                console.log('Inside Else - Blank Session Id')
              }
            });
          } 
          else {
            var last_action = parseInt(result[0].activity_time);
            if ((timestamp - last_action) > 900) {
              let q1 = `UPDATE tbl_distributor_users SET login_datetime='${timestamp}',session_id='${session_id}',activity_time='${timestamp}' where distributor_user_id='${dis_usr_id}'`;
              con.query(q1);
              let q2 = `Select * from tbl_distributor where distributor_id='${dis_id}'`;
              con.query(q2, (error, info) => {
                if (error) throw error;
                else if (info.length) {
                  let flag = true;
                  let dis_cat = info[0].distributor_category;
                  // Setting up session variable for Serial No. Distributor Category 
                  if ((dis_cat.indexOf("Serial No") >= 0))
                    sessionData['serialno_sale'] = "Yes";
                  else
                    sessionData['serialno_sale'] = "No";

                  let custom_module = info[0].custom_module;
                  let AGRO_type = info[0].AGRO_type;
                  let job_work_type = info[0].job_work;
                  let stone_crusher_type = info[0].stone_crusher;
                  if (custom_module == 'Yes') {
                    sessionData['custom_module'] = { 'custm_session_dist_id': dis_id, 'custm_dis_user_id': dis_usr_id, 'user_role': user_role };
                    //sessionData.push({"custom_module": { 'custm_session_dist_id': dis_id, 'custm_dis_user_id': dis_usr_id, 'user_role': user_role } });
                  } else if (job_work_type == 'Yes') {
                    sessionData['job_work'] = { 'jobwork_user_id': dis_id, 'jobwork_dis_user_id': dis_usr_id, 'jobwork_user_role': user_role };
                    //sessionData.push({"job_work": { 'jobwork_user_id': dis_id, 'jobwork_dis_user_id': dis_usr_id, 'jobwork_user_role': user_role } });
                  } else if (AGRO_type == 'Yes') {
                    sessionData['AGRO_type'] = { 'agro_user_id': dis_id, 'agro_dis_user_id': dis_usr_id, 'agro_user_role': user_role };
                    //sessionData.push({"AGRO_type": {'agro_user_id': dis_id, 'agro_dis_user_id': dis_usr_id, 'agro_user_role': user_role } });
                  } else if (stone_crusher_type == 'Yes') {
                    sessionData['stone_crusher'] = { 'stone_session_dist_id': dis_id, 'stone_dis_user_id': dis_usr_id, 'user_role': user_role };
                    //sessionData.push({"stone_crusher": {'stone_session_dist_id': dis_id, 'stone_dis_user_id': dis_usr_id, 'user_role': user_role } });
                  }
                  else {
                    sessionData['other'] = { 'session_dist_id': dis_id, 'dis_user_id': dis_usr_id, 'user_role': user_role };
                    //sessionData.push({ "other": {'session_dist_id': dis_id, 'dis_user_id': dis_usr_id, 'user_role': user_role }});
                  }
                  sessionData['user_session'] = session_id;
                  if (flag) {
                    if (stone_crusher_type == 'Yes')
                      header = { "url": "stone_module/dashboard" };
                    else if (custom_module == 'Yes')
                      header = { "url": "custom_module/dashboard" };
                    else if (job_work_type == 'Yes')
                      header = { "url": "job_work/dashboard" };
                    else if (AGRO_type == 'Yes')
                      header = { "url": "AGRO/dashboard" };
                    else
                      header = { "url": "dashboard" };
                  }

                  data = { "header": header, "session": sessionData };
                  output = {
                    "status": 200,
                    "msg": "Fetch Successfull",
                    "data": data
                  }
                  res.end(JSON.stringify(output));
                } else{
                  console.log('Inside Else - With Session Id')
                }
              });
            } else {
              let q = `select * from tbl_distributor_users where distributor_id='${dis_id}' and session_id='${session_id}'`
              con.query(q, (error, info) => {
                if (info.length) {
                  output = { "status": 202, "msg": "You are already logged in same browser.Please logout and then try again!", "data": [] }
                } else {
                  /** Base64 Encoding */
                  //let id = btoa(dis_usr_id);
                  id = dis_usr_id;
                  output = { "status": 200, "msg": "Successfull", "data": [{ "url": `/login-confirmation?logid=${id}` }] };
                }
              });
              res.end(JSON.stringify(output));
            }
          }
        }
        else {
          console.log('Email and password does not match!');
        }
      });
    } catch (e) {
      console.log('Something went wrong ' + e);
    }
  } else if (requestFrom == 'App') {
    res.end(JSON.stringify(req.body));
  }
});

/*
router.get('/signup', (req, res) =>  {
  console.log(req.query);
});
*/
router.post('/signup', (req, res) => {
  let data = req.body;
  res.header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });







  //httpMsgs.sendJSON(req, res, data);
  //httpMsgs.send200(req, res, "Got it");
  //res.send(data);
  res.end(JSON.stringify(data));
});

module.exports = router;
