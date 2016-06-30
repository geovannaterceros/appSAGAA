
   var express = require('express');
   var app = express();
   var parseString = require('xml2js').parseString;
   var parse = require('xml2json');
   var fs = require('fs');
   var fileSIS;
    
  
    fs.readFile('../archivo/COSTAS_JAUREGUI_VLADIMIR_ABEL_199800001_-_134111_2-2014.sis', 'utf8', function (err,data) {
       if (err) {
                   return console.log(err);
                 }
           parseString(fileS(data), function(error, result){
               console.log(result);
                fileSIS = result;
           });
   })
   app.get('/', function (req, res) {
         res.send('Hello World!');
   });

   app.get('/fileS', function(req, res){
       
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware

    res.json(fileSIS);
   });

   var fileS = function(data){
        var nuevoFile;
           nuevoFile = data.split(/\n/);
           nuevoFile.splice(nuevoFile[0],1);
           nuevoFile.splice([nuevoFile.length-2],2);
           nuevoFile.join('');
           return  nuevoFile;
    };
    
    
   app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
   });
