const fs = require('fs');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: '46.101.187.89',
    port: '3306',
    user: 'remote_user',
    password: 'test',
    database: 'example',
    ssl: {
        ca: fs.readFileSync(__dirname + '/certs/ca.pem'),
        key: fs.readFileSync(__dirname + '/certs/client-key.pem'),
        cert: fs.readFileSync(__dirname + '/certs/client-cert.pem')
    }
});

connection.connect();

connection.query('SELECT * FROM Names', function (error, results, fields) {
    if (error) throw error;
    let rows = results.map(n=> `<tr><td>${n.gender}</td><td>${n.firstName} ${n.lastName}</td><td>${n.email}</td></tr>`).join("\n");
    console.log(rows);
});
   
connection.end();