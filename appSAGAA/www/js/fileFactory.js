angular.module('starter.factorys',[])
.factory('sisFactory', function($http, $q, $location, $localStorage, logHttp) {
  //    var urlBase = 'http://172.20.10.3:8080';
  //  var urlBase = 'http://192.168.43.226:8080';
  //  var urlBase = 'http://167.157.28.244:8080';
  //  var urlBase = 'http://192.168.0.105:8080';
    var urlBase = 'http://10.0.125.149:8080';
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
    console.log(datos);
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
    },
    //datos para realizar la session en el del servidor al saga
    sisFactory.posDataUsuario = function(datos){
     var usuarioJ = JSON.stringify(datos);
        console.log(usuarioJ);
        var defered = $q.defer();
        var promise = defered.promise;

         $http.post(urlBase+'/datosU', usuarioJ,{skipAuthorization:true})
         .success(function(data) {
            console.log("respuesta debe ser el token");
            console.log(data);
             //primera vez q entra con esta cuenta guarda los datos en el token
              if(!window.localStorage.getItem('id_token')){
                  console.log("recien creamos al token");
                  window.localStorage.setItem('id_token', data);
              }else{
                  console.log("ya ha sido creado");
                  console.log(window.localStorage.getItem('id_token'));
              }
              defered.resolve(data);
              $location.path("app/gestion");
          })
            // verificamos q exista la cookies
            // antes haiga realizado, su session
          .error(function(err){
                alert('Se esta utilizando en modo offline servidor no disponible');
            if(window.localStorage.getItem('id_token')){
                alert('Se esta utilizando en modo offline, ha recuperado su session anterior de los datos del celular');
             console.log(window.localStorage.getItem('id_token'));
             $location.path("app/gestion");
            }else{
                alert('Se esta utilizando en modo offline y no ha creado anteriormente su session para guardar en el celular.');
            }
             console.log(err);
             defered.reject(err);
          });
         return promise;
    },
    sisFactory.posDataGestion = function(){
        var defered = $q.defer();
        var promise = defered.promise;
        var skipAuthorization = false;
         $http.post(urlBase+'/gestion', {skipAuthorization : false}, conf)
         .success(function(data) {
          console.log(data);
          defered.resolve(data);
           // $location.path("app/gestion");
          })
          .error(function(err) {
             defered.reject(err)
             console.log("I have error");
             console.log("Of Data Interceptor:");
             console.log(logHttp.getAllRequests());
             window.localStorage.setItem('id_request', logHttp.getAllRequests());
          });
         return promise; 
    };
    sisFactory.posDataCarrera = function(g){
        console.log(g);
        var dato = {gestion: g}
        var gestionD = JSON.stringify(dato);
        var defered = $q.defer();
        var promise = defered.promise;
        var skipAuthorization = false;
         $http.post(urlBase+'/carrera', gestionD, {skipAuthorization : false}, conf)
         .success(function(data) {
          console.log(data);
          defered.resolve(data);
           // $location.path("app/gestion");
          })
          .error(function(err) {
             defered.reject(err)
             console.log("I have error");
             console.log("Of Data Interceptor:");
             console.log(logHttp.getAllRequests());
             window.localStorage.setItem('id_request', logHttp.getAllRequests());
          });
         return promise; 
    };
    //detalle de carreras
    sisFactory.posDataDetalle = function(carrera){
        var descargarD = JSON.stringify(carrera);
        var defered = $q.defer();
        var promise = defered.promise;
        var skipAuthorization = false;
         $http.post(urlBase+'/detalle', descargarD, {skipAuthorization : false}, conf)
         .success(function(data) {
          console.log(data);
          defered.resolve(data);
           // $location.path("app/gestion");
          })
          .error(function(err) {
             defered.reject(err)
             console.log("I have error");
             console.log(logHttp.getAllRequests());
             window.localStorage.setItem('id_request', logHttp.getAllRequests());

          });
         return promise; 
    };
   return sisFactory;
});

