var sql = require('mssql');
var fs = require('fs');
var config = require('./config.js'); //file with credential

var conn = new sql.ConnectionPool(config.db);
var req = new sql.Request(conn);

//connection to SQL en SELECT XML from funtion 

function getXML(){
    conn.connect(function (err){
        if(err)
            //throw err;
            console.log(err);
    });
    req.query('SELECT * FROM ', function(err, recordset){
        if(err)
            //throw err;
            console.log(err);
        else   
            console.log(recordset);
        conn.close();
    });
};

getXML();

//create a xml file with query result

/*
var date = new Date();
var filename = getFullYear(date).toString() + ('0' + getMonth(date) + 1).slice(-1).toString() + getDate(date).toString() + '.xml';

fs.writeFileSync(filename, getXML());
*/