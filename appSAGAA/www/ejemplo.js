
   var express = require('express');
   var bodyParser = require('body-parser');
   var app = express();
   var stream = require('stream');
   var replaceStream = require('replacestream');
   var path = require('path');
   var fs = require('fs');
   
        var path1 = 'archivo/original.sis';
        console.log("reemplazando datos");
        fs.createReadStream(path.join(__dirname, path1))
        .pipe(replaceStream('3002', '3003'))
        .pipe(process.stdout)
        .pipe(fs.createWriteStream('archivo/original.sis'));
  
    app.get('/', function (req, res) {
         res.send('Hello World!');
   });
   
    app.listen(4000, function () {
      console.log('Example app listening on port 3000!');
   });
