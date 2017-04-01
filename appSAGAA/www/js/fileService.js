angular.module('starter.services', [])
.service('CrearBDServ', function(){
 //Dividiendo el archivo Sis 
    return {
        divFile : function(data , template){
            var aux;
            if(template == 'informacion'){
               return (((((data.pcd).head)[0]).info))[0];
            }else{
                if(template == 'materias'){
                    return (((((data.pcd).head)[0]).group)[0]).normal;
                }else{
                    //fin head
                    if(template == 'mesas'){
                        return (((((data.pcd).head)[0]).group)[0]).me;
                    }else{
                    //body 
                                
                                var obj = ((((data.pcd).body)[0]).gradelist)[0];
                                obj["_"] = null; 
                                delete obj._;

                                console.log(data.pcd);
                                console.log(Object.keys(obj).length);
                                return  obj[template];
                    //fin body */
                     }
                 }
            }
        },

       //Separando por "," y eliminando el inicio y el final porq son campos vacios
        sepDatos : function(infoCadena){
            console.log(infoCadena);
        var arrayInfo = infoCadena.split(",");
            arrayInfo.splice(0, 1);
            arrayInfo.splice(arrayInfo.length-1, 1);
            return arrayInfo;
        },
        
        crearBDInf : function(array){
            return  newBD = {
                'fechaC ' : array[0],
                'fecgaE'  : array[1],
                'codDoc' : array[2],
                'nomApeDoc' : array [3],
                'codCarrera' : array[4],
                'nomCarrera' : array[5],
                'anoGestion' : array[6],
                'numGestion' : array[7],
                'nomGestion' : array[8],
                'codFacultad' : array[9],
                'nomFacultad' : array[10],
                'codUpsi' : array[11],
                'nomUpsi' : array[12]
            };
        },

        crearBDGrupo: function(array){
            return newBD = {
                'codP' : array[0],
                'codMat' : array[1],
                'grupoMat' : array[2],
                'nomMat' : array[3],
                'temMat' : array[4],
                'pesoGloMat' : array[5],
                'pesoExaFMat' : array[6],
                't1Mat' : array[7],
                't2Mat' : array[8],
                't3Mat' : array[9],
                'p1Mat' : array[10],
                'p2Mat' : array[11],
                'p3Mat' : array[12]
            };
        },

        crearBDListaEstN: function(array){
            return newBD ={
                'NRO' : array[0],
                'CODEST' : array[1],
                'NOMBRE' : array[2],
                'ERPAR' : array[3],//modificado por error token sin numero
                'DOPAR' : array[4],//modificado por error token sin numero
                'PROMED' : array[5],
                'EXAFIN' : array[6],
                'da' : array[7],//modificado por error token sin numero
                'NOTFIN' :array[8],
                'NOTCON' : array[9]
            };
        },
        
        crearBDListaEstM: function(array){
            return newBD ={
                'NRO' : array[0],
                'CODEST' : array[1],
                'NOMBRE' : array[2],
                'RAOPC' : array[3],//modificado por error token sin numero
                'DAOPC' : array[4],//modificado por error token sin numero
                'NOTFIN' : array[5],
                'NOTCON' : array[6]
            };
        },
        //Unir datos
        unirFile : function(data, cadenaListaE, codP, tipo){
                    console.log(data);
                    var array = [];
                    if( tipo == 'ME'){
                        array = cadenaListaE;
                        ((((((data.pcd).body)[0]).gradelist)[0])[codP])[0] = array;
                        console.log(data);
                    }else{
                       array = cadenaListaE;
                       ((((((data.pcd).body)[0]).gradelist)[0])[codP])[0] = array;
                       console.log(data);
                     }
            console.log(((((((data.pcd).body)[0]).gradelist)[0])[codP])[0]);
            //return cadenaListaE;
            return data;
        },

        unirDatosNormal : function(arrayObj){
            var arrayAux = [];
            var cadena;
                arrayAux[0] = arrayObj.NRO;
                arrayAux[1] = arrayObj.CODEST;
                arrayAux[2] = arrayObj.NOMBRE;
                arrayAux[3] = arrayObj.ERPAR;
                arrayAux[4] = arrayObj.DOPAR;
                arrayAux[5] = arrayObj.PROMED;
                arrayAux[6] = arrayObj.EXAFIN;
                arrayAux[7] = arrayObj.da;
                arrayAux[8] = arrayObj.NOTFIN;
                arrayAux[9] = arrayObj.NOTCON;
                cadena = arrayAux.join();
               //porq se unen la cadena le hemos aumentado interleneado
                cadena = cadena + "\r";
                return cadena;
        },

        unirDatosMesa : function(arrayObj){
             var arrayAux = [];
             var cadena;
                arrayAux[0] = arrayObj.NRO;
                arrayAux[1] = arrayObj.CODEST;
                arrayAux[2] = arrayObj.NOMBRE;
                arrayAux[3] = arrayObj.RAOPC;
                arrayAux[4] = arrayObj.DAOPC;
                arrayAux[5] = arrayObj.NOTFIN;
                arrayAux[6] = arrayObj.NOTCON;
                cadena = arrayAux.join();
                //se unen las cadenas modificadas por este motivo debemos
                //aumentarle salto de linea
                cadena =  cadena + "\r";
                return cadena;
        },


    };
})
.service('ListaEstServ', function(){
    var materia, tipo ;
    var obj = {};
    return {
        getcodP : function(){
                console.log("codP service get:"+ materia);
                obj = {codP : materia, tipo : tipo };
                    return obj; 
        },
        setcodP : function(codP, grupo){
            console.log("codP service set:"+ codP);
                    materia = codP;
                    tipo = grupo;
        }
    }
})
.service('GuardarData', function(){
    var data = {};
    var dataSis = {};
    return {
        getDataSis : function(){
            return dataSis;
        },
        setDataSis : function(dataM){
            console.log(dataM);
            dataSis = dataM;
        }
    }
})
.service('GuardarListaEst', function(){
    return {
        guardarLE : function(estudiante){
        console.log(estudiante);
       }
    }
})
//services for SAGAA chango data
.service('GestionDato', function(){
    var gestion;
    return {
        setGestion: function(g){
            gestion = g;
        },
        getGestion : function(){
            return gestion;
        }
    }
})
.service('CarreraDato', function(){
    var carrera;
    return {
        setCarrera: function(c){
            carrera = c;
        },
        getCarrera : function(){
            return carrera;
        }
    }
})
/*.factory('sisFactory', function($http) {
    var urlBase = 'http://localhost:3000';
    //var sisFactory = {};
    var config = {
        headers : {'Accept' : 'application/json'}
    };
   // sisFactory.postDataSis = function (datos) {
   //     return $http(urlBase + 'sisF', datos);
   // },
    //sisFactory.getDataSis = function(){
        return $http.get(urlBase +'/fileS', config);
   // }
   // return sisFactory;
})*/
//Beging save offline
.service('myInterceptor', function($q, $timeout, logHttp){
    return {
        'request': function(config){
            //si realiza para cuando los enviamos
            //necesito este dato para save el envio
           logHttp.push(config);
           console.log("entro al request sin errores");
            return config;
        },

        'requestError': function(rejection){
            console.log("It request have error");
            window.localStorage.setItem('id_request', data);
            console.log("cuando existe problemas in request");
            // $rootScope.$broadcast("msg");
            // $rootScope.$on("msg", function(){
             alert('Existe algun error en la peticion');
          // });
             return $q.reject(rejection);
        },

        'response': function(response){
            console.log("The request good");
            if(window.localStorage.getItem('id_request')){
                window.localStorage.removeItem('id_request');
                console.log("elimino id_request");
            }
            return $timeout(function(){
                return response;
            });

        },

        'responseError': function(rejection){
            //necesito este dato para ver q la respuesta es correcta
            //verificar q me responde el backend
            console.log("tenemos algun ERROR");
            if(rejection.status === 404){
                console.log("error en la coneccion");
                window.localStorage.setItem('id_request', data);
               // window.location.reload();
               //  $state.reload();

            }
            if(rejection.status === -1){
                console.log("error de -1");
             alert('Existe algun error en la respuesta');
                window.localStorage.setItem('id_request', data);
                //window.location.reload();
                //  $state.reload();
            }
           //$rootScope.$broadcast("msg");
           //$rootScope.$on("msg", function(){
           //});
            logHttp.pushR(rejection);
            return $q.reject(rejection);
        }
    }
})
.service('logHttp', function($q) {
   var requestsConfig = [];
   var responseConfig = [];
    return {
        push: function(config) {
            console.log("push");
            requestsConfig = config;
        },
        getAllRequests: function() {
            console.log("entra al All request");
            console.log($q.reject(requestsConfig));
            return requestsConfig;
        },
        pushR: function(config){
            console.log("entro al pushR");
            responseConfig = config;
        },
        getAllResponse: function(){
            console.log("entro al get Response");
            console.log($q.reject());
            return responseConfig;
        }
    }
})
.service('SagaaService', function($q) {
     var _db;    
    var _sagaas;

    return {
        initDB: initDB,

        getAllSagaas: getAllSagaas,
        addSagaa: addSagaa,
        updateSagaa: updateSagaa,
        //deleteSagaa: deleteSagaa,
        
    };

    function initDB() {
        // Creates the database or opens if it already exists
        _db = new PouchDB('sagaa', {adapter: 'websql'});
    };

    function addSagaa(sagaa) {  
        console.log("This add");
        return $q.when(_db.post(sagaa));
    };

    function updateSagaa(sagaa) {  
        console.log("this update");
        return $q.when(_db.put(sagaa));
    };

    function deleteSagaa(sagaa) {
        console.log("this delete");
        return $q.when(_db.remove(sagaa));
    };

   function getAllSagaas() {
    if (!_sagaas) {
       return $q.when(_db.allDocs({ include_docs: true}))
            .then(function(docs) {
                // Each row has a .doc object and we just want to send an 
                // array of birthday objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.
                _sagaas = docs.rows.map(function(row) {
                    // Dates are not automatically converted from a string.
                  //  row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
                });
                // Listen for changes on the database.
                _db.changes({ live: true, since: 'now', include_docs: true})
                   .on('change', onDatabaseChange);
                return _sagaas;
            });
    } else {
        // Return cached data as a promise
        return $q.when(_sagaas);
    }
  };
function onDatabaseChange(change) {  
    var index = findIndex(_sagaas, change.id);
    var sagaa = _sagaas[index];

    if (change.deleted) {
        if (sagaa) {
            _sagaas.splice(index, 1); // delete
        }
    } else {
        if (sagaa && sagaa._id === change.id) {
            _sagaas[index] = change.doc; // update
        } else {
            _sagaas.splice(index, 0, change.doc) // insert
        }
    }
}

// Binary search, the array is by default sorted by _id.
function findIndex(array, id) {  
    var low = 0, high = array.length, mid;
    while (low < high) {
    mid = (low + high) >>> 1;
    array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
}
})
.service('ObjetoService', function() {
    return {
        getObjeto : getObjeto
    }

    function getObjeto(dato, sagaa){
        for(var i = 0; i<sagaa.length; i++){
            console.log(sagaa[i]);
            if( sagaa[i].dato){
                return i;
            }
        }
    }
});
