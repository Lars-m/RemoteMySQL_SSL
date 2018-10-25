var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: '46.101.187.89',
  port: '3306',
  user: 'remote_user',
  password: 'test',
  database: 'example',
  ssl: {
    ca: fs.readFileSync(path.join(__dirname,'../certs/ca.pem')),
    key: fs.readFileSync(path.join(__dirname,'../certs/client-key.pem')),
    cert: fs.readFileSync(path.join(__dirname,  '../certs/client-cert.pem'))
  }
});



/* GET home page. */
router.get('/', function (req, res, next) {
  //connection.connect();
  connection.query('SELECT * FROM Names', function (error, results, fields) {
    if(error){
      throw new error
    }
    let rows = results.map(n=> `<tr><td>${n.gender}</td><td>${n.firstName} ${n.lastName}</td><td>${n.email}</td></tr>`).join("");
    let row = "<tr><td>Gender</td><td>Name</td><td>email</td></tr>";
   // connection.end();

    res.render('index', {
      title: 'MySQL Node/Express-Demo',
      info: 'This example fetches data from a Remote MySQL Server, using a Secure SSL Connection',
      rows: results,
      row:row
    });
  });
});

module.exports = router;
