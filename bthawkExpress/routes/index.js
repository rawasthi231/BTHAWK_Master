var express = require('express');
var router = express.Router();
var httpMsgs = require('http-msgs');
const cors = require('cors');
//const session = require('express-session');
const bodyParser = require('body-parser');
var con = require('../db');
var app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', (req, res) => {
  let data = req.body;
  res.header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
  //httpMsgs.sendJSON(req, res, data);
  //httpMsgs.send200(req, res, "Got it");
  //res.send(data);
  res.end(JSON.stringify(data));
});


module.exports = router;
