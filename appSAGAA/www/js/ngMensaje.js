angular.module('starter').directive('ngMensaje', function(){
    return {
        templateUrl : "templates/mensaje.html",
        replace : true,
        restric : "AE",
        scope:{
            mensaje : "=",
            valor : "="
        },
        transclude: true
    }
});
