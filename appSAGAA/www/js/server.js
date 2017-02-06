
   var express = require('express');
   var bodyParser = require('body-parser');
   var app = express();
   var parseString = require('xml2js').parseString;
   var parse = require('xml2json');
   var jsonxml = require('jsontoxml');
   var fs = require('fs');
   var fileSIS;
   var sisFILE;
   var datafile;
   var readline = require('readline');
   var stream = require('stream');
   var replaceStream = require('replacestream');
   var path = require('path');
   var replace = require('replace'); 
   var glob = require('glob');
   var jwt = require('jsonwebtoken'); 
   var Base64 = require('js-base64').Base64;
   var mySecretKey = "1234asdfLKKJH";
   // permite recibir datos, del http.post 
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json({ type: 'application/*+json' }));

   var path1 = '../archivo/original4.sis';
   fs.readFile(path1 , 'utf8', function (err,data) {
       if (err) {
                   return console.log(err);
                 }
           parseString(fileS(data), function(error, result){
                datafile = data;
                fileSIS = result;
           });
   });

   app.get('/', function (req, res) {
         res.send('Hello World!');
   });

   app.get('/fileS', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Accept", "application/json");
   
   //ayuda a modificar en tiempo real al file 
        fs.watch(path1, function(event, targetfile){
            console.log(event + targetfile);
            if(event == "change"){
                fs.readFile(path1 , 'utf8', function (err,data) {
                   parseString(fileS(data), function(error, result){
                    datafile = data;
                    fileSIS = result;
                    });
                });
            }
       });
    res.json(fileSIS);
   });

    app.post('/sisF', function(req, res){

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        console.log('POST /');
        sisF(req.body);
        
        res.end('thanks');
   });
    //beging la parte de la aplicacion SAGAA
    //Realizando la session al servidro del SAGAA
    app.post('/datosU', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Accept', 'application/json');
         res.setHeader('Content-Type', 'application/json');
        console.log('POST /');
        console.log(req.body); 
        var credentials = {
            username : req.body.username,
            password : req.body.password
        };
        //Deberia comparar con los datos del servidor del SAGAA, after send to
        //SAGAA
        if(credentials.username == 'admin@gmail.com' && credentials.password =='admin'){
            
            var cred64 = Base64.encode(credentials);
            var token = jwt.sign(credentials, mySecretKey);
            console.log(token);
            return res.status(200).json(token);
        }else{
            return res.status(500).json({
                msg: "Error los datos son incorrectos no se puede loguear al SAGAA"
            });
        }
    });
    //Realizando la peticion para la Seleccion de Elegir la Gestion
    app.post('/gestion', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Accept', 'application/json');
        res.setHeader('Content-Type', 'application/json');
        console.log('POST /');
        var token = null;
        //Datos auxiliares del SAGAA
        var listaG = {
            gestion1 : "1-2016 PRIMER SEMESTRE",
            gestion2 : "2-2016 SEGUNDO SEMESTRE"
        }
        console.log(req.headers);
          if(req.headers.authorization){
            var authorization = req.headers.authorization.split(' ');
            console.log(authorization);
            if(authorization.length == 2){
                var key = authorization[0];
                var val = authorization[1];
                if(key == "Bearer"){
                    console.log("la clave:"+val);
                    console.log("comparamos el jwt si es correcto");
                    return res.status(200).json(listaG);
                }else{
                   return res.status(500).json({msg:"no eres el correcto amigo, fuera de aqui"});
                }
            }
            else{
                console.log("Usted no tiene permiso para ingresar");
                return res.status(400).json({msg:"no tiene permiso para entrar"})
            }
          }else{
            console.log("there isnt't authorize")
            return res.status(505).json({msg:"so so"});
          }
       });

    app.post('/carrera', function(req, res){
        console.log('POST /');
        var token = null;
        //Datos auxiliares del SAGAA
        var listaC = {
            plan1 : {
                plan :'Ing. Electronica',
                archivo : 'COSTAS_VLADIMIR_123456_1_2016.sis',
                numeroDC : '2',
                ultimaFD : '10:30 10-11-2016'},

            plan2 : {
                plan : 'Ing. Sistemas',
                archivo : 'COSTAS_VLADIMIR_123456_2_2016.sis',
                numeroDC : '5',
                ultimaFD : '12:30 15-11-2016'},

            plan3 : {
                plan : 'Lic. Informatica',
                archivo : 'COSTAS_VLADIMIR_12345_3_2016.sis',
                numeroDC : '5',
                ultimaFD : '12:30 15-11-2016'},
        }
        console.log(req.body); 
        var authorization = req.headers.authorization.split(' ');
            console.log(authorization);
            if(authorization.length == 2){
                var key = authorization[0];
                var val = authorization[1];
                if(key == "Bearer"){
                    console.log("la clave:"+val);
                    console.log("comparamos el jwt si es correcto");
                    return res.status(200).json(listaC);
                }else{
                   return res.status(500).json({msg:"no eres el correcto amigo, fuera de aqui"});
                }
            }
            else{
                console.log("Usted no tiene permiso para ingresar");
                return res.status(400).json({msg:"no tiene permiso para entrar"})
            }
    });

    app.post('/detalle', function(req, res){

        console.log('POST /');
        var token = null;
        console.log(req.body); 
        var authorization = req.headers.authorization.split(' ');
            console.log(authorization);
            if(authorization.length == 2){
                var key = authorization[0];
                var val = authorization[1];
                if(key == "Bearer"){
                    console.log("la clave:"+val);
                    console.log("comparamos el jwt si es correcto");
                    return res.status(200).json({msg:"esta pidiendo al servidor, para descargar un file"});
                }else{
                   return res.status(500).json({msg:"no eres el correcto amigo, fuera de aqui"});
                }
            }
            else{
                console.log("Usted no tiene permiso para ingresar");
                return res.status(400).json({msg:"no tiene permiso para entrar"})
            }
    });
   //trabajo extra del servidor, esta bien q haga esto mas
   //jajajaajaj aun no lo se
   var fileS = function(data){
        var nuevoFile;
           nuevoFile = data.split(/\n/);
           nuevoFile.splice(nuevoFile[0],1);
           nuevoFile.splice([nuevoFile.length-2],2);
           nuevoFile.join('');
           return  nuevoFile;
    };

    var datoNuevo = [];
    var datoAntiguo = [];
    var re = /\r\n|\r\r|\n\r|\n|\r/g;
    
    var antesFile = function(data){
        var nuevoFile;
        nuevoFile = data[0];
        var regular = />/g;
        var arrayLinea = nuevoFile.replace(regular, ">\n");
        var prueba = nuevoFile.replace(regular,">\n");
        //aumentado enter en la linea lo >/n
        var re = /\r\n|\r\r|\n\r|\n|\r/g;
        arrayLinea = arrayLinea.replace(re,"\n").split("\n");
        //"sacando la , de adelante"
        for(var i = 0 ; i < arrayLinea.length; i++){
            if(!arrayLinea[i].indexOf(',')){
                arrayLinea[i] = arrayLinea[i].replace(',','');
            }//eliminando basura del template
            if(arrayLinea[i]=="<template>"){
                arrayLinea.splice(i+1, 1);
                arrayLinea.splice(i+4, 3);
            }
        }
        //aumentado el inicio y el final
        arrayLinea.unshift("PCD5.0");
        arrayLinea.pop();
        arrayLinea.push("3002");
        arrayLinea.push("");
        arrayLinea.push("");
        //guardando en el file
        var auxFile = datafile.split(/\n/);
        var dato1, dato2, dato3, con1=0, con2=0, result;
        //cada vez q llamamos al file el watch lo vuelve a actualizar 
       newDato(path1, arrayLinea);

        return arrayLinea;
     };
   
    function newDato(data, array){
        searchDato(data, array);
        for(var i = 0; i < datoAntiguo.length; i++){
           addFile(data, datoAntiguo[i], datoNuevo[i]);
        }

    }

    function addFile(file, antiguo, nuevo){
        var re = /\r\n|\r\r|\n\r|\n|\r/g;
        glob(file, function(err, files) {
           if (err) { throw err; }
               files.forEach(function(item, index, array) {
                    console.log(item + ' found');
                    replace({
                        regex : antiguo,
                        replacement : nuevo+'\r',
                        paths : [item],
                        recursive : true,
                        silent : true
                        });
                        console.log('Replacement complete');
                        console.log(fs.readFileSync(item, 'utf8'));
                 });
             });
    }
    function searchDato (pathlocal, arrayM){
    
       fs.readFileSync(pathlocal).toString().split('\n').forEach(recorriendo);

        function recorriendo(line, index, arr) { 
                aux = line.replace(re, '');//sancando \r
                if(aux != arrayM[index]){
                    if(arrayM[index] != '<normal>'){
                        if(arrayM[index]!='<me>'){
                            datoNuevo.push(arrayM[index]);
                            datoAntiguo.push(line);
                        }
                    }
                }
        }
    }

    var sisF = function(data){
        //Limpiando json antes de convertirlo a xml
               var objpcd = data.pcd;
               objpcd['_'] = null;
               delete objpcd._;
               console.log(data.pcd);
               
               var objhead = (((data.pcd).head)[0]);
               objhead['_'] = null;
               delete objhead._;

               var objcolumn = (((((data.pcd).head)[0]).column)[0]);
               objcolumn['_'] = null;
               delete objcolumn._;

               var objgroup = (((((data.pcd).head)[0]).group)[0]);
               objgroup['_'] = null;
               delete objgroup._;

               var objbody = (((data.pcd).body)[0]);
               objbody['_'] = null;
               delete objbody._;

        var xml = jsonxml(data);
        sisFILE = xml;
        var sis = new Array(xml);
        //Limpiando datos del xml por cadenas
        antesFile(sis);
        return xml;
    };
    
   app.listen(8080, function () {
      console.log('Example app listening on port 8080!');
   });
