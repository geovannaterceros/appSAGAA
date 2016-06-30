angular.module('starter.services', [])

.factory('FileFact', function($http){

    //Configura el header para obtener permiso y recuperar el json 
    var config = {
        headers : {'Accept' : 'application/json'}
    };
    
    //Se conecta al servidor y le envia su header para permiso
   return   $http.get('http://localhost:3000/fileS', config)
})
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
                    //bodyi 
                                var obj = ((((data.pcd).body)[0]).gradelist)[0];
                                obj["_"] = null; 
                                delete obj._;
                                console.log(Object.keys(obj).length);
                                return  obj[template];

                        //fin body */
                     }
                 }
            }
        },
       //Separando por "," y eliminando el inicio y el final porq son campos vacios
        sepDatos : function(infoCadena){
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
        }
    };
})
.service('ListaEstServ', function(){
    var materia, tipo ;
    var obj = {};
    return {
        getcodP : function(){
                obj = {codP : materia, tipo : tipo };
                    return obj; 
        },
        setcodP : function(codP, grupo){
                    materia = codP;
                    tipo = grupo;
        }
    }
});
