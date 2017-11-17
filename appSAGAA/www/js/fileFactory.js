angular.module('starter.factorys',[])
.factory('sisFactory', function($http, $q, $location, $localStorage, logHttp) {
  //    var urlBase = 'http://172.20.10.3:8080';
  //  var urlBase = 'http://192.168.43.226:8080';
  //  var urlBase = 'http://167.157.28.244:8080';
  //  var urlBase = 'http://192.168.0.105:8080';
    //var urlBase = 'http://10.0.125.149:8080';
    //var urlBase = 'http://192.168.0.103:8080';
    var urlBase = 'http://192.168.43.209:8080';
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
            if(window.localStorage.getItem('guardar')){
             window.localStorage.removeItem('guardar');
            }else{
                $location.path("app/materias");
            }
          })
          .error(function(err) {
             defered.reject(err);
      //       console.log("I have error subir file");
        //     console.log(logHttp.getAllRequests());
             window.localStorage.setItem('id_request', logHttp.getAllRequests());
             alert("Vamos a guardar localmente los datos, porque no tenemos connecion de datos, wifi");
             if(!window.localStorage.getItem('guardar')){
                 window.localStorage.setItem( 'guardar'  ,'guardar');
             }
             $location.path("app/materias");
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
        //console.log(usuarioJ);
        var defered = $q.defer();
        var promise = defered.promise;

         $http.post(urlBase+'/datosU', usuarioJ,{skipAuthorization:true})
         .success(function(data) {
             //console.log(data);
             //primera vez q entra con esta cuenta guarda los datos en el token
             //verificar los datos
            if(data){//verifica si entraga datos erroneos
               // console.log("guarda los datos");
                if(!window.localStorage.getItem('id_token')){
                    window.localStorage.setItem('username', datos.username);
                    window.localStorage.setItem('password', datos.password);
                    window.localStorage.setItem('id_token', data);
                      defered.resolve(data);
                      $location.path("app/gestion");
                }
                   defered.resolve(data);
                   $location.path("app/gestion");
            }else{
                alert("Los datos son erroneos" +  data.msg);
             }
          })
            // verificamos q exista la cookies
            // antes haiga realizado, su session
          .error(function(err){
            // console.log(err);
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
          //console.log(data);
          defered.resolve(data);
           // $location.path("app/gestion");
          })
          .error(function(err) {
             defered.reject(err)
            // console.log("I have error");
            // console.log("Of Data Interceptor:");
             //console.log(logHttp.getAllRequests());
             window.localStorage.setItem('id_request', logHttp.getAllRequests());
          });
         return promise; 
    };
    sisFactory.posDataCarrera = function(g){
        var dato = {gestion: g}
        var gestionD = JSON.stringify(dato);
        var defered = $q.defer();
        var promise = defered.promise;
        var skipAuthorization = false;
         $http.post(urlBase+'/carrera', gestionD, {skipAuthorization : false}, conf)
         .success(function(data) {
          //console.log(data);
          defered.resolve(data);
           // $location.path("app/gestion");
          })
          .error(function(err) {
             defered.reject(err)
             //console.log("I have error");
             //console.log("Of Data Interceptor:");
             //console.log(logHttp.getAllRequests());
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
          //console.log(data);
          defered.resolve(data);
           // $location.path("app/gestion");
          })
          .error(function(err) {
             defered.reject(err)
             //console.log("I have error");
             //console.log(logHttp.getAllRequests());
             window.localStorage.setItem('id_request', logHttp.getAllRequests());

          });
         return promise; 
    };
   return sisFactory;
})
.factory('loadingInterceptor',  function($timeout, $injector, $q ) {

    var requestInitiated;

    function showLoadingText(){
        $injector.get("$ionicLoading").show({
            template : 'Cargando...',
            animation : 'fade-in',
            showBackdrop : true
        });
    };

    function hideLoadingText(){
        $injector.get("$ionicLoading").hide();
    };

    return {
        
        request: function(config){
          if(config.url.endsWith('.html')) {
            //console.log("Peticion html");
          }else{
             requestInitiated = true;
             showLoadingText();
            // console.log('La peticion inicializa con Interceptor');
          }
          return config;
        },
        
        response : function(response){
            requestInitiated = false;
            $timeout(function(){
                if(requestInitiated) return;
                hideLoadingText();
               // console.log('Respuesta con Interceptor');
            }, 300);
            return response;
        },
        
        requestError : function (err){
            hideLoadingText();
            //console.log('Request error via Interceptor');
            return err;
        },
        
        responseError : function (err){
            hideLoadingText();
            //console.log('ErrorRespuesta via Interceptor');
            //console.log("q.reject" + $q.reject(err));
            return $q.reject(err);
        }
    }
});
