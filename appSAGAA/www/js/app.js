angular.module('starter', ['ionic', 'satellizer','starter.controllers', 'starter.services', 'starter.filter', 'starter.directive', 'starter.factorys', 'starter.networkfactorys','ngCordova', 'ngStorage', 'angular-jwt', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
    
  $stateProvider

   .state('app', {
    url : '/app',
    abstract : true,
    templateUrl : 'templates/app.html',
    controller : 'AppCtrl'
  })
  .state('app.inicio', {
    url : '/inicio',
      views : { 
          'appContenido' : {
             templateUrl: 'templates/inicio.html',
             controller: 'InicioCtrl'
            }
      }
  })
  .state('app.gestion', {
    url : '/gestion',
      views : {
          'appContenido' : {
            templateUrl: 'templates/gestion.html',
            controller: 'GestionCtrl'
            }
     }
  })
  .state('app.seleccionar', {
    url : '/seleccionar',
      views : {
          'appContenido' : {
            templateUrl: 'templates/seleccionar.html',
            controller: 'SeleccionarCtrl'
            }
     },
     cache: false
  })
  .state('app.detalle', {
    url : '/detalle',
      views : {
          'appContenido' : {
            templateUrl: 'templates/carreras.html',
            controller: 'DetalleCtrl'
            }
        }
  })
  .state('app.informacion', {
    url: '/informacion',
      views: {
        'appContenido' : {
             templateUrl : 'templates/informacion.html',
             controller : 'InformacionCtrl'
        },
        'menuListaIzquierda' : {
             templateUrl : 'templates/menuIzquierdo.html'
        }
      }
  })
  .state('app.materias', {
    url: '/materias',
      views: {
        'appContenido': {
             templateUrl: 'templates/materias.html',
             controller: 'MateriasCtrl'
        },
        'menuListaIzquierda' : {
            templateUrl : 'templates/menuIzquierdo.html'
        }
      }
  })
  .state('app.estudiantes', {
    url: '/estudiantes',
      views: {
        'appContenido' : {
            templateUrl : 'templates/estudiantes.html',
            controller : 'EstudiantesCtrl'
        },
        'menuListaDerecha' : {
            templateUrl: 'templates/menuDerecho.html'
        }
     },
    cache: false
  });
  
  /*jwtOptionsProvider.tokenGetter = function(){
      console.log("entra al tokenGetter");
      var token = localStorage.getItem('id_token');
      console.log("El token:"+token);
      return token;
  }*/

  jwtOptionsProvider.config({
       //whiteListedDomains: ['167.157.28.244'],
       //whiteListedDomains: ['localhost', '192.168.0.105'],
       //whiteListedDomains: ['localhost', '192.168.43.226'],
       whiteListedDomains: ['localhost', '172.20.10.3'],
       tokenGetter: function(options, jwtHelper){
         var token = localStorage.getItem('id_token');
          return token;
       }
  });
  
  var interceptor = function ($q, logHttp) {
    return {
        responseError: function(rejection) {
        //Maybe do some kind of check right here           
         logHttp.push(rejection.config);
         if(localStorage.getItem('id_request')){
            console.log("hay error, lo guardamos");
         }
         else{
            localStorage.setItem('id_request', logHttp.getAllRequests());
         }
            return $q.reject(rejection);
        }
    }
  };
 $httpProvider.interceptors.push('jwtInterceptor');
 $httpProvider.interceptors.push('myInterceptor');
 // $httpProvider.Interceptors.push("jwtInterctor");
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/inicio');
});
