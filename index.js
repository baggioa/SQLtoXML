var sql = require('mssql');
var fs = require('fs');
var config = require('./config.js'); //file with credential


var conn = new sql.ConnectionPool(config.db);
var req = new sql.Request(conn);

//connection to SQL en SELECT XML from funtion 

function getXML(){
    conn.connect(function (err){
        if(err)
            console.log(err);
        req.query('SELECT dbo.fnACRONIS_WebOrders() AS Orders ', function(err, recordset){
            if(err)
                console.log(err);
            else { 

                //create file xml
                
                var date = new Date();
                var filename = 'WO' + date.getFullYear().toString() + ('0' + (date.getMonth() + 1).toString()).slice(-2) + ( '0' + date.getDate().toString()).slice(-2) + '.xml';
                fs.writeFileSync(filename, recordset.recordset[0].Orders);
            }
            conn.close();
        });
    });
};

getXML();



