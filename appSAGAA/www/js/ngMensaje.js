angular.module('starter').directive('ngMensaj', function(){
    return {
        templateUrl: "templates/mensaje.html",
        scope:{
            title : "@",
            mensaje : "="
        }
    }
});
