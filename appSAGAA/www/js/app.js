// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filter', 'starter.directive' ,'ngCordova'])

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

.config(function($stateProvider, $urlRouterProvider) {
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
            templateUrl: 'templates/menuDerecho.html',
        }
     }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/inicio');
});
