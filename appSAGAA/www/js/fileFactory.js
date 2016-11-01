angular.module('starter.factorys',[])
.factory('sisFactory', function($http, $q, $location) {
    var urlBase = 'http://localhost:3000';
    var sisFactory = {};
    var dato = {};
    var config = {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    var conf = {
        headers : {
             'Access-Control-Allow-Origin' : '*',
             'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
             'Content-Type': 'application/json',
             'Accept': 'application/json'
        }
    };

    sisFactory.postDataSis = function (datos) {
     var fileJ = JSON.stringify(datos);
     console.log(fileJ); 
     var defered = $q.defer();
     var promise = defered.promise;
         $http.post(urlBase+'/sisF', fileJ, conf)
         .success(function(data) {
          console.log(data);
          defered.resolve(data);
             $location.path("app/materias");
          })
          .error(function(err) {
             defered.reject(err)
          });
         return promise; 
    },
    sisFactory.getDataSis = function(){
     var defered = $q.defer();
     var promise = defered.promise;
         $http.get(urlBase+'/fileS', config)
         .success(function(data) {
          defered.resolve(data);
          })
          .error(function(err) {
             defered.reject(err)
          });
         return promise; 
    };
   return sisFactory;
});

