
   var express = require( 'express' );
   var bodyParser = require( 'body-parser' );
   var app = express();
   var parseString = require( 'xml2js' ).parseString;
   var parse = require( 'xml2json' );
   var jsonxml = require( 'jsontoxml' );
   var fs = require( 'fs' );
   var readline = require( 'readline' );
   var stream = require( 'stream' );
   var replaceStream = require( 'replacestream' );
   var path = require( 'path' );
   var replace = require( 'replace' ); 
   var glob = require( 'glob' );
   var jwt = require( 'jsonwebtoken' ); 
   var Base64 = require( 'js-base64' ).Base64;
   var Curl= require( 'node-libcurl' ).Curl;
   var Easy = require( 'node-libcurl' ).Easy;
   var cheerio = require( 'cheerio' ); 
   var querystring = require( 'querystring' );
   var rp = require( 'request-promise' );
   var sequenty = require('sequenty');
   var async = require("async"); 
   var mySecretKey = "1234asdfLKKJH";
   var estadoC = false;
   // permite recibir datos, del http.post 
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json({ type: 'application/*+json' }));
   var idUsuario, idGestion, nombreArc, grupoN;

   app.get('/', function (req, res) {
         res.send('Hello World!');
   });

   /*app.get('/fileS', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Accept", "application/json");
   
   //modificar en tiempo real al file 
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
    //termina la modificacion del file
    res.json(fileSIS);
   });*/

    app.post('/sisF', function(req, res){

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        console.log('POST /Guardarrr');
        console.log('res tipo pos 0:' + req.body[0].codP);
        console.log('res tipo pos 1:' + req.body[1].pcd );

        //modifica el file
        sisF(req.body[1]);
        var respuestaS;
        //console.log(usuarioId); 
       //------Inicio sincronized with SAGAA UPLOAD
    if(usuarioId){
        app.use(Curl);
        var curlS = new Curl(),
            dirA = '/home/geovanna/appSAGAA/appSAGAA/www/archivo/',
            nameD = nombreAr,
            idUsuario = usuarioId;
            idGestion = gestionId;
            url  = 'http://pruebas.fcyt.umss.edu.bo/sagaa/pre_academico/subirNotasParcialesP.php';
        
        curlS.setOpt( Curl.option.URL, url );
        curlS.setOpt( Curl.option.POST, 1);
        curlS.setOpt( Curl.option.HTTPHEADER,['Connection: keep-alive', 'User-Agent: Mozilla/5.0','Content-Type: multipart/form-data;',  'Cache-Control: max-age=0', 'Accept-Encoding: gzip, deflate'] );
        curlS.setOpt( Curl.option.HTTPPOST, [{name: 'idUsuario', contents: idUsuario }, {name: 'idGestion', contents: idGestion }, { name: 'archivoNotas', file: dirA + nameD, type: 'application/vnd.symbian.install'}, { name: 'subirArchivo', contents: 'Subir Archivo'  }]);
        curlS.setOpt( Curl.option.COOKIEFILE, 'cookie.txt');
        curlS.setOpt( Curl.option.FOLLOWLOCATION, true);
        curlS.setOpt( Curl.option.VERBOSE, true );

        curlS.on( 'end', function( statusCode, body, headers ) {
            console.info( statusCode );
            respuestaS = statusCode;
            curlS.close();
            if(statusCode == 200){
                subiendoG();
            }else{
                console.info('Tiene algun error al subir');
            }
        });

        curlS.on( 'error', function( err ) {
            console.info( err );
            this.close();
        });
        curlS.perform();
        //------Fin sincronized 
    };
    function subiendoG(){
        console.info(respuestaS);
        var curlSG = new Curl(),
        urlSG  = 'http://pruebas.fcyt.umss.edu.bo/sagaa/pre_academico/subirNotasParcialesP2.php',
        dataSG = {
            'notasCargar[]' : req.body[0].codP,
             'subirNotas' : 'Finalizar Operación'
        };
         dataSG = querystring.stringify(dataSG);

         curlSG.setOpt( Curl.option.URL, urlSG );
         curlSG.setOpt( Curl.option.FOLLOWLOCATION, true);
         curlSG.setOpt( Curl.option.POST, 1);
         curlSG.setOpt( Curl.option.POSTFIELDS, dataSG );
         curlSG.setOpt( Curl.option.HTTPHEADER, ['User-Agent: Mozilla/5.0','Content-Type: application/x-www-form-urlencoded'] );
         curlSG.setOpt( Curl.option.COOKIEFILE, 'cookie.txt');
         curlSG.setOpt( Curl.option.VERBOSE, true );
    
         curlSG.on( 'end', function( statusCodeSG, bodySG, headersSF ) {
            console.info( '------->' );
            console.info( statusCodeSG );
            console.info( '------->' );
            console.info( bodySG );
            curlSG.close();
         });
         curlSG.on( 'error', function( err ) {
            console.info( err );
            curlSG.close();
        });
        curlSG.perform();
    }

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
        console.log('POST /datosU la session');
        //Deberia comparar con los datos del servidor del SAGAA, after send to
        //SAGAA
        var credentials = {
            username : req.body.username,
            password : req.body.password
        };
        setTimeout(function(){
            app.use(Curl);
            var curl = new Curl(),
                url  = 'http://pruebas.fcyt.umss.edu.bo/sagaa/login/loginP.php',
                data = {
                            'loginUsuario' : req.body.username,
                            'claveUsuario' : req.body.password,
                            'botonFormulario' : 'Ingresar'
                };
        
            data = querystring.stringify(data);
             
            curl.setOpt( Curl.option.URL, url );
            curl.setOpt( Curl.option.FOLLOWLOCATION, true);
            curl.setOpt( Curl.option.POST, 1);
            curl.setOpt( Curl.option.POSTFIELDS, data );
            curl.setOpt( Curl.option.HTTPHEADER, ['User-Agent: Mozilla/5.0','Content-Type: application/x-www-form-urlencoded'] );
            curl.setOpt( Curl.option.COOKIEFILE, 'pcb5r5tg8l1lbcjbqffr6hfm56');
            curl.setOpt( Curl.option.COOKIEJAR, 'cookie.txt');
            curl.setOpt( Curl.option.VERBOSE, true );
        
            curl.on('end', function( statusCode, body, headers ) {
        
                if( statusCode == 200 ) {
                    var cred64 = Base64.encode( data );
                    var token = jwt.sign( data, mySecretKey );
                    this.close();
                    return res.status( statusCode ).json( token );
                }else{
                    this.close();
                    return res.status( statusCode ).json({
                        msg: "Error los datos son incorrectos no se puede loguear al SAGAA"
                    });
                }
            });
            curl.on( 'error', curl.close.bind( curl ) );
            curl.perform();
            
        });
    });
    //Realizando la peticion para la Seleccion de Elegir la Gestion
    app.post('/gestion', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Accept', 'application/json');
        res.setHeader('Content-Type', 'application/json');
        console.log('POST /gestion');
        var token = null;
        //Datos auxiliares del SAGAA
        if(req.headers.authorization){
        setTimeout( function(){
            app.use(Curl);
            var curlAdm = new Curl(),
            urlAdm = 'http://pruebas.fcyt.umss.edu.bo/sagaa/pre_academico/descargarPlanillasNotas.php';
            curlAdm.setOpt( Curl.option.URL, urlAdm );
            curlAdm.setOpt( Curl.option.FOLLOWLOCATION, true);
            curlAdm.setOpt( Curl.option.HTTPHEADER, ['User-Agent: Mozilla/5.0', 'Connection: keep-alive', 'Content-Type: application/x-www-form-urlencoded'] );
            curlAdm.setOpt( Curl.option.COOKIEFILE, 'cookie.txt');
            curlAdm.setOpt( Curl.option.VERBOSE, true );
            
            curlAdm.on( 'end', function( statusCode, body , headers) {
                console.info(statusCode);
                if(statusCode == 200){
                    console.info(body);
                    var $ = cheerio.load(body);
                    var gestiones = [] ;
                        $('form[name="forGestion"]').each( function (){
                            gestiones.push({
                                idUsuario : $('input[name="idUsuario"]').val()
                            });
                        });
                        $('tr.celdaColorResultado1').each(function(){
                            $('option').each(function(i, option){
                                gestiones.push({
                                    id : $(this).val(),
                                    name : $(this).text()
                                 });
                                console.info(gestiones[i]);
                            });
                            curlAdm.close();
                            return res.status(200).json(gestiones);
                        });
                }else{
                    curlAdm.close();
                    return res.status(statusCode).json(body);
                }
            });
            
            curlAdm.on( 'error', curlAdm.close.bind( curlAdm ) );
            curlAdm.perform();
        });
        }else{
            return res.status(505).json({msg:"Usted no tiene permiso para continuar"});
        }
        /*
        var listaG = {
            gestion1 : "1-2017 PRIMER SEMESTRE",
            gestion2 : "2-2017 SEGUNDO SEMESTRE"
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
          }*/
    
    });

    app.post('/carrera', function(req, res){
        console.log('POST /carrera');
        var token = null;
        //Datos auxiliares del SAGAA
        /*var listaC = {
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
            }*/
        var authorization = req.headers.authorization.split(' ');
            if(req.headers.authorization){
                
                app.use(Curl);
                
                var curlPlan = new Curl(),
                    urlPlan = 'http://pruebas.fcyt.umss.edu.bo/sagaa/pre_academico/descargarPlanillasNotasF.php',
                    data = "idUsuario=" + req.body.gestion.idUsuario + "&idGestion=" + req.body.gestion.idGestion + "&selectGestion=Seleccionar Gestión";
                usuarioId = req.body.gestion.idUsuario;
                gestionId = req.body.gestion.idGestion;
    
                curlPlan.setOpt( Curl.option.URL, urlPlan );
                curlPlan.setOpt( Curl.option.FOLLOWLOCATION, true );
                curlPlan.setOpt( Curl.option.POSTFIELDS, data );
                curlPlan.setOpt( Curl.option.HTTPHEADER, ['User-Agent: Mozilla/5.0','Content-Type: application/x-www-form-urlencoded'] );
                curlPlan.setOpt( Curl.option.COOKIEFILE, 'cookie.txt');
                curlPlan.setOpt( Curl.option.VERBOSE, true );
                
                curlPlan.on( 'end', function( statusCode, body , headers) {
                //inicio scraping carreras
                    var carreras = [];
                    var $ = cheerio.load(body);
                    buscarCarrera('tr.celdaColorResultado2');
                    buscarCarrera('tr.celdaColorResultado1');
        
                    function buscarCarrera(trCarrera){
                        $(trCarrera).each(function( i, elem){
                            var detalles = [];
                             this === elem
                            $ (this).find('div').each(function(a, el){
                                this === el
                                if( a < 5 ){
                                    detalles [a] = $(this).text();
                                }else{
                                    if( a == 5){
                                        detalles [a] = $ ( this ).find( 'a' ).attr( 'href' );
                                    }else{
                                        detalles [a] = $ ( 'input[name="codPlanillaDescargar[]"]' ).val();
                                    }
                                }
                            });
                            var detalle = {};
                                detalle = {
                                    nro : filtroDetalle( detalles[0] ),
                                    carrera : filtroDetalle( detalles [1] ),
                                    nombreArc : filtroDetalle( detalles [2] ),
                                    numeroDC : filtroDetalle( detalles [3] ),
                                    ultimaDC : filtroDetalle( detalles [4] ),
                                    descarga : filtroDetalle( detalles [5] ),
                                    zip : filtroDetalle( detalles [6] )
                                };  
                            carreras.push(detalle);
                        });
                        console.info('-----carreras --------');
                        console.info( carreras );
                    };
                    //fin scraping carreras
                    this.close(); 
                    return res.status(200).json(carreras);
                });
    
                curlPlan.on( 'error', curlPlan.close.bind( curlPlan ) );
                curlPlan.perform();
            }
            else{
                console.log("Usted no tiene permiso para ingresar");
                return res.status(400).json({msg:"no tiene permiso para entrar"})
            }
    });

    app.post('/detalle', function(req, res){

        console.log('POST /detalle');
        var token = null;
        var authorization = req.headers.authorization.split(' ');
            if(authorization.length == 2){
                var key = authorization[0];
                var val = authorization[1];
                if(key == "Bearer"){
                    //Beging scraping
                
                app.use(Curl);
                var curlDes = new Curl(),
                urlDes = 'http://pruebas.fcyt.umss.edu.bo/sagaa/pre_academico/' + req.body.descarga; 
                var name = req.body.nombreArc;
                nombreAr = name;//compartiendo nombre file
                console.log();
                curlDes.setOpt( Curl.option.URL, urlDes );
                curlDes.setOpt( Curl.option.FOLLOWLOCATION, true);
                curlDes.setOpt( Curl.option.FAILONERROR, true)
                curlDes.setOpt( Curl.option.HTTPHEADER, ['Content-Type: application/download', 'Content-Disposition: attachment; filename='+name ,'Content-Transfer-Encoding: binary'] );
                curlDes.setOpt( Curl.option.COOKIEFILE, 'cookie.txt');
                curlDes.setOpt( Curl.option.VERBOSE, true );
                
                curlDes.on( 'end', function( statusCode, body , headers) {
                    //Desde aqui comienza lectura file sis
                    //crea el archivo sis para q todos lo 
                    //usen los puedean utilizar sin cambios es puro
                    archivoSIS(name, body);
                    
                    //change parse
                    var sisJson;//
                    // fileSIS;var global result
                    // datafile;var global body
                    console.log(body);
                    parseString( fileS( body ), function( error, result ){
                        console.log(result);
                        datafile = body;
                        fileSIS = result;
                        sisJson = result;
                    });
                    console.info('---Json-------');
                    console.info(sisJson);
                    this.close(); 
                    return res.status( 200 ).json( sisJson );
                });
                
                curlDes.on( 'error', curlDes.close.bind( curlDes ) );
                curlDes.perform();
                
                    //Then scraping
                }else{
                   return res.status(500).json({msg:"no eres el correcto amigo, fuera de aqui"});
                }
            }
            else{
                console.log("Usted no tiene permiso para ingresar");
                return res.status(400).json({msg:"no tiene permiso para entrar"})
            }
    });
   //creando el archivo sis
    function archivoSIS(nombreAD, cuerpo){
        var path = "../archivo/";
        var fileContent = cuerpo;
        var name = nombreAD;
        path1 = path + name;
         /*fs.stat( path + name , function(error, stats){
           console.log('verificando existe:' + stats.isFile());
         });*/
         fs.writeFile( path+name, fileContent,(err) =>{
            if(err)throw err;
            console.log("el file ha sido creado y llenando los datos");
         })
    }
    //Filtra los datos de Detalle    
    function filtroDetalle(dato){
        var re = /\r\n|\r\r|\n\r|\n|\r/g;
        var espacio  = dato.replace(re , '');
        var cadenaD = [];
        //condicion para hacer los espacios
        for ( var i = 0 ; i < espacio.length; i++){
            if(espacio [i] != " "){
                cadenaD.push(espacio[i]);
            }
        }
        var cadenaU = cadenaD.join('');
        return cadenaU;
    }
   //trabajo extra del servidor, esta bien q haga esto mas
   //jajajaajaj aun no lo se
   //ahora lo sabre
   var path1;
   var fileSIS;//guarda cuando descarga el result
   var sisFILE;
   var datafile;//guardo cuando descargo el archivo es el body original
   var inicio;//datos para armar
   var fin;//datos para armar

   //modificar en tiempo real al file 
   /*fs.watch(path1, function(event, targetfile){
            console.log(event + targetfile);
            if(event == "change"){
                fs.readFile(path1 , 'utf8', function (err,data) {
                   parseString(fileS(data), function(error, result){
                    datafile = data;
                    fileSIS = result;
                    });
                });
            }
       });*/
    //termina la modificacion del file
   /*fs.readFile(path1 , 'utf8', function (err,data) {
       if (err) {
                   return console.log(err);
                 }
           parseString(fileS(data), function(error, result){
                datafile = data;
                console.log(result);
                fileSIS = result;
           });
   });*/
   /*
    * Metodo q elimina el inicio, final y espacios vacios para convertirlo 
    * a json para enviarlo datos para el transcriptor del  celular.
    */
   var fileS = function(data){
       console.log('------fileS data sis------');
       console.log(data);
       console.log('------tam data sis------');
       console.log(data.length);
        var nuevoFile;
           nuevoFile = data.split(/\n/);
           console.log('tam1 los divide por salto de linea:' + nuevoFile.length );
           inicio = nuevoFile[0];
           nuevoFile.splice(nuevoFile[0],1);
           console.log('tam2 sacando el inicio:' + nuevoFile.length );
           fin = nuevoFile[nuevoFile.length-1];
           nuevoFile.splice([nuevoFile.length-1],1);
           console.log('tam3 sancando el final' + nuevoFile.length );
           nuevoFile.join('');
           return  nuevoFile;
    };

    var datoNuevo = [];
    var datoAntiguo = [];
    var re = /\r\n|\r\r|\r\r\r|\n\r|\n|\t|\r/g;
    var mesa , normal;
    //empezamos el file para hacer upload.
    /*Elimina los caracteres salto de linea, , demas , vacio y aumenta 
     * la llave de inicio y final luego lo convierte en array.
     * */
    var antesFile = function(data){
        var nuevoFile;
        nuevoFile = data[0];
        console.log('------------> file modificado desde app ---------');
        console.log(nuevoFile);
        var regular = />/g;
        var arrayLinea = nuevoFile.replace(regular, ">\n");
        //aumentado enter en la linea lo >/n
        var re = /\r\n|\r\r|\r\r\r|\n\r|\n|\t|\r/g;
        arrayLinea = arrayLinea.replace(re, "\n");
        arrayLinea = arrayLinea.split("\n");
        //elimina los espacios vacios
        for(var i = 0;  i< arrayLinea.length; i++){
            var cadena = arrayLinea[i];
           if(cadena == ''  ){ 
                arrayLinea.splice( i,1 );
            }
        }
        console.log('------------>file modificado sin linea vacia-------');
        console.log(arrayLinea);
        /*Solo saca las , de adelante del nuevo archivo
         * */
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
        console.log("------>los datos sin , adelante-------");
        console.log(arrayLinea);
        //aumenta la llave del archivo del inicio y del final
        fin = fin.replace( re, '' );
        inicio = inicio.replace( re, '');
        arrayLinea.unshift(inicio);
        arrayLinea.push(fin); 
        newDato(path1, arrayLinea);
        return arrayLinea;
    
     };
    /* Es un metodo intermediario manda a buscar lo q se debe cambiar luego le
     * manda a reemplazarlo en el file.sis
     * */
    function newDato(data, array){
        console.log('----newDato----');
        console.log(array);
        searchDato(data, array);
        for(var i = 0; i < datoAntiguo.length; i++){
           addFile(data, datoAntiguo[i], datoNuevo[i]);
        }

    }
    /*Recorre todo el file.sis existente en el servidor y busca la diferencias
     * y la almacena en el array datoAntiguo, datoNuevo ,para luego modificarlo.
     */
    function searchDato (pathlocal, arrayM){
    
       fs.readFileSync(pathlocal).toString().split('\n').forEach(recorriendo);
        function recorriendo(line, index, arr) {
            //aux es cada linea el file.sis y eliminandole los saltos de linea
            var aux = line.replace(re, '');//sancando \r
            var datoAux = arrayM[index];//
            console.log("dato a ser analizado: "+ datoAux+ "----size:" + datoAux.length);
            console.log("aux: "+aux+ "----size aux:"+ aux.length);
            if(line != ''){//verifica q no sea vacio
            if(aux != arrayM[index]){//verifica si son diferentes lo almacena en datoNuevo y datoAntiguo
                if(arrayM[index] != '<normal>'){
                    if(arrayM[index]!='<me>'){
                        datoNuevo.push(arrayM[index]);
                        console.log("busca nuevo:"+arrayM[index]);
                        datoAntiguo.push(line);
                        console.log("busca antiguo"+line);
                    }
                }
            }
            }
        }
    }
/*Modifica los datos del file.sis  le envian datoAntiguo y datoNuevo y lo
 * remplaza toda la columna le aumentamos /r para q lo asigne saltos de lineas
 * propios.
 * */
    function addFile(file, antiguo, nuevo){
       var re = /\r\n|\r\r|\n\r|\n|\r/g;
        console.log("antiguo" + antiguo);
        console.log("nuevo" + nuevo);
          glob(file, function(err, files) {
           if (err) { throw err; }
               files.forEach(function(item, index, array) {
                    console.log( item );
                    replace({
                        regex : antiguo,
                        replacement : nuevo + '\r',
                        paths : [item],
                        recursive : true,
                        silent : true
                        });
                        console.log('Remplaza por linea o  complete');
                 });
        });
    }
    /*Recepciona json  con los cambios realizados por el celular
     * Elimina los datos llave para el websql.
     * Elimina '_' basuras q envian desde el celular.
     * Convierte a xml y luego a un array 
     * */
    var sisF = function(data){
        //Limpiando json antes de convertirlo a xml
     //   console.log(data);
        delete data._id;
        delete data._rev;
      //  console.log(data);
               var objpcd = data.pcd;
               objpcd['_'] = null;
               delete objpcd._;
               
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
        //console.log(data);
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
