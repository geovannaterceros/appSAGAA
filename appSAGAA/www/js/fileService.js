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
.factory('sisFactory', function($http) {
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
});

