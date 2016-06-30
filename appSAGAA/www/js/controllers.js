angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('InicioCtrl', function($scope, $ionicLoading){
    $scope.mensaje = function(){
      return  "No hay red";
    };
    $ionicLoading.show();
        setTimeout(function(){
             $ionicLoading.hide();}, 3000);
})
.controller('GestionCtrl', function($scope, $ionicPopup, $timeout){
    var bandera = false; 
    $scope.mostrar = bandera;
    $scope.showPopup = function() {
         $scope.nuevoG = {};
        var myPopup = $ionicPopup.show({
        templateUrl: 'templates/seleccionar.html',
        title: 'Gestion',
     scope: $scope,
     buttons:[
            {text: 'Cancelar'},
            {
                text:'<b>Aceptar</b>',
                onTap: function(e){
                    console.log($scope.nuevoG.checked);
                    $scope.data= $scope.nuevoG.checked;
                    bandera = !bandera;
                    $scope.mostrar = bandera;
                }  
            }]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
  };
})
//Obtener la Informacion Docente, Carrera, Facultad
.controller('InformacionCtrl', function($scope, FileFact, CrearBDServ ) {
    FileFact.then(
        function(response){
                var info = CrearBDServ.divFile(response.data, 'informacion');
                var infoA = CrearBDServ.sepDatos(info);
                var infoD = CrearBDServ.crearBDInf(infoA);
                $scope.datos = infoD;
         },
         function(){
             console.log("error obtener data");
         });
})
//Mostrar las materias 
.controller('MateriasCtrl', function($scope, FileFact, CrearBDServ, ListaEstServ){
    FileFact.then(
        function(response){
            var g = function(tipo){
                var array = [];
                var arrayObj = [];
                var x = 0;
                var grupo = CrearBDServ.divFile(response.data, tipo);
                var grupoA = CrearBDServ.sepDatos(grupo[0]);
                var grupoT = (grupoA.length)/13;
                var ini = 0;
                var fin = 13;
                for(var i = 0; i <= grupoT ; i++){
                    for(var j = ini; j < fin; j++){
                        array[x] = grupoA[j];
                        x++;
                    }
                        arrayObj[i] = CrearBDServ.crearBDGrupo(array);
                        x = 0 ;
                        ini = fin;
                        fin = (i + 1) * 13;
                }
                for(var i = 0; i< arrayObj.length; i++){
                    if(arrayObj[i] === '{}'){
                         arrayObj.splice(i, 1);
                     }
                    else{
                        if(i == 0){
                        arrayObj.splice(i, 1);
                        }
                    }
                } 
                   return arrayObj;
            }
                    $scope.materias = g('materias');
                    $scope.mesas = g('mesas');
            }, function(){
                console.log("ERROR");
           }
    );
    //enviar parametros entre controlador
    $scope.matEst = function(codP, tipo){
        ListaEstServ.setcodP(codP, tipo);
    }

})
//Mostrar la lista de estudiantes segun la material seleccionanada
.controller('EstudiantesCtrl', function($scope ,$ionicModal ,ListaEstServ ,FileFact ,CrearBDServ){
    var grupo  = ListaEstServ.getcodP();
    console.log(grupo);
    FileFact.then(function(response){
    var l = function(numId){
        var array = [];
        var arrayObj = [];
        var x = 0;
        var lista = CrearBDServ.divFile(response.data ,grupo.codP);
        var listaA = CrearBDServ.sepDatos(lista[0]);
        var listaT = (listaA.length)/numId;
        var ini = 0;
        var fin = numId;
            for(var i = 0; i <= listaT ; i++){
                    for(var j = ini; j < fin; j++){
                       array[x] = listaA[j];
                        x++;

                    }
                       if(numId == 10){

                            arrayObj[i] = CrearBDServ.crearBDListaEstN(array);
                       }
                       if(numId == 7){
                       
                            arrayObj[i] = CrearBDServ.crearBDListaEstM(array);
                       }
                        x = 0 ;
                        ini = fin;
                        fin = (i + 1) * numId;
                }
                for(var i = 0; i< arrayObj.length; i++){
                    if(arrayObj[i] === '{}'){
                         arrayObj.splice(i, 1);
                     }
                    else{
                        if(i == 0){
                        arrayObj.splice(i, 1);
                        }
                    }
                }
                   return arrayObj;
            }
        var tipo;
        var url;
        if(grupo.tipo == 'ME'){
            tipo = 7;
            url = "templates/planillaNotaEstMesa.html"; 
        }else{
            tipo = 10;
            url = "templates/planillaNotaEstNormal.html";
        }
        $scope.listaN = l(tipo);

   $ionicModal.fromTemplateUrl(url, function($ionicModal) {
           $scope.modal = $ionicModal;
   }, {
         scope: $scope
    });
    $scope.openModal = function(estudiante) {
        $scope.mostrar = function(datoVal, datoMax ){
            $scope.errorV = datoVal;
            $scope.errorM = datoMax;
            $scope.$apply();
        };
        $scope.estudiante = estudiante;
         $scope.modal.show();
    }
   
    }, function(response){});

    
})
.controller('FileCtrl', function($scope, FileFact) {

    $scope.showContent = function($fileContent){
            $scope.content = $fileContent;
    };

        FileFact.then(
            function(response){
                console.log(response.data);
            },
            function(){
                console.log("error obtener data");
            });
   
 })
.controller('OpenCtrl', function($scope, $cordovaFileOpener2){
    $scope.mostrar = 'OpenCtrl';
    $cordovaFileOpener2.open(
        '/sdcard/Download/gmail.apk',
        'application/vnd.android.package-archive'
    ).then(function() {
      console.log("encontro el file");
      }, function(err) {
      console.log("no encontro el file");
     });
});
