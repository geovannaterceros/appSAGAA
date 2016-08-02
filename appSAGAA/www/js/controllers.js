angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, GuardarData) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    console.log(GuardarData.getDataSis());
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
  // Mi codigo menu
  $scope.guardarLE = function(estudiante){
    console.log("ya podemos guardar");
    console.log(estudiante);
  }
  //$scope.myGoBack = function(){
      if($ionicHistory.currentStateName() == "app.inicio"){
        $scope.mostrarAtras = true;
      }else{
        $scope.mostrarAtras = false;
      }
    console.log($ionicHistory.currentStateName());
    console.log("volver atras");
  //}

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
.controller('EstudiantesCtrl', function($scope ,$ionicModal ,ListaEstServ ,FileFact ,CrearBDServ, GuardarData){
    var grupo  = ListaEstServ.getcodP();
    console.log(grupo);
    var arrayObj =[];
    FileFact.then(function(response){
        var l = function(numId){
            var array = [];
            var x = 0;//repartir
            console.log(response.data);
            console.log(grupo.codP);
            var lista = CrearBDServ.divFile(response.data ,grupo.codP);//devuelve una cadena de datos 
            console.log(lista);
            var listaA = CrearBDServ.sepDatos(lista[0]);//separa por coma y quita la primera y ultima q son vacios 
            var listaT = (listaA.length)/numId;  
            //cantidad de estudiantes depende la materia 7(mesa) o 11(normal)
            var ini = 0;//repartir
            var fin = numId;//repartir
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
                }//guarda en el objeto de bd
                console.log("how to makeing-------------");
                console.log("size::"+arrayObj.length);
                for(var i = 0; i< arrayObj.length; i++){
                    console.log(arrayObj[i]);
                    if(arrayObj[i] === '{}'){
                         console.log(arrayObj[i]);
                         arrayObj.splice(i, 1);
                     }
                    else{
                        if(i == 0){
                        console.log(arrayObj[i]);
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
    },
    {
        scope: $scope
    });

    var estudiante = {};
    var bandera ;
   /*2da Instancia, editar los campos
    * Identifica que tipo de atributo con opcion 
    * Cambiar los atributos del estudiante seguna al campo editado
    * */
    $scope.openModal = function(est) {
        estudiante = est;
        $scope.mostrar = function(datoVal, datoMax, dato, opcion){
            if(opcion === "primeraOp" && dato > 51){
                $scope.errorRV = datoVal;
                $scope.errorRM = datoMax;
                $scope.daOp = false;
                estudiante.RAOPC = dato;
                estudiante.NOTFIN = dato;
                estudiante.NOTCON = 'A';
            }

            if(dato < 51 ){
                $scope.daOp = true;
                estudiante.NOTFIN = dato;
                estudiante.NOTCON = 'R';
                if(opcion === "primeraOp"){
                    $scope.errorRV = datoVal;
                    $scope.errorRM = datoMax;
                }else{
                    $scope.errorDV = datoVal;
                    $scope.errorDM = datoMax;
                }
            }

            if(opcion ==="segundaOp" && dato >51)
            {   estudiante.DAOPC = dato;
                estudiante.NOTFIN = dato;
                estudiante.NOTCON = 'A';
                $scope.errorDV = datoVal;
                $scope.errorDM = datoMax;
            }
            $scope.$apply();
        };
        //si es que ya ha editado la primera opcion
        if(estudiante.RAOPC != 0 ){
            $scope.daOp = true;
        }
        //comienza para planilla de notas de la materia Normal
        $scope.mostrarN = function(datoVal, datoMax, dato, opcion){
            var promedio = 0;
            if(opcion == "primerP"){
                $scope.errorPV = datoVal;
                $scope.errorPM = datoMax;
                estudiante.ERPAR = dato;
                estudiante.PROMED = estudiante.ERPAR / 2;
                estudiante.NOTFIN = estudiante.PROMED;
            }
            if(opcion == "segundoP"){
                $scope.errorSV = datoVal;
                $scope.errorSM = datoMax;
                estudiante.DOPAR = dato;
                var p = Number(estudiante.ERPAR);
                var s = Number(estudiante.DOPAR);
                estudiante.PROMED = (p + s)/2;
                estudiante.NOTFIN = estudiante.PROMED;
            }
            //reprobado
            if(estudiante.PROMED <=51 ){
                $scope.exFin = true;
            }
            else {
                $scope.exFin = false;
                estudiante.NOTFIN =  estudiante.PROMED;
                estudiante.NOTCON = 'A';
            }
            if(opcion == "examenF"){
                $scope.errorFV = datoVal;
                $scope.errorFM = datoMax;
                estudiante.EXAFIN = dato;
                estudiante.NOTFIN = dato;
                if(estudiante.NOTFIN <= 51){
                    estudiante.NOTCON = 'R';
                }
                else{
                    estudiante.NOTCON = 'A';
                }
            }
            if(opcion == "daInstancia"){
                $scope.errorDV = datoVal;
                $scope.errorDM = datoMax;
                estudiante.da = dato;
                estudiante.NOTFIN = dato;
                if(estudiante.NOTFIN <= 51){
                    estudiante.NOTCON = 'R';
                }else{
                    estudiante.NOTCON = 'A';
                }
            }
            if(estudiante.PROMED >= 26 && estudiante.EXAFIN <=51 && estudiante.EXAFIN != ''){
                $scope.daInst = true;
            }else{
                $scope.daInst = false;
            }
            $scope.$apply();
        }
        //fin de planilla de notas
        $scope.estudiante = estudiante;
        $scope.modal.show();
    };

    $scope.closeModal = function(estudiante){
        $scope.daOp = false;
        //si no ha realizado cambios en en ninguna opcion deberia mostrarle un
        //mensaje
        if(estudiante.RAOPC == 0 && estudiante.DAOPC == 0){
            alert("No ha insertado Nota");
        }
        $scope.modal.hide();
        //CrearBDServ.guardarDatos(estudiante);
        console.log("Empezamos------------------ guardar");
        var cadenaArray = [];
        for (var i = 0; i < arrayObj.length; i++){
                if(estudiante.NRO == arrayObj[i].NRO){
                    arrayObj[i] = estudiante;
            };
                if(arrayObj[i].RAOPC != undefined){//mesa
                    cadenaArray [i] = CrearBDServ.unirDatosMesa(arrayObj[i]); 
                }
                if(arrayObj[i].ERPAR != undefined){//normal
                    cadenaArray [i] = CrearBDServ.unirDatosNormal(arrayObj[i]); 
                }
        };
        cadenaArray.push('');
        cadenaArray.unshift('');
        var cadenaUnida = cadenaArray.join();
            console.log(CrearBDServ.unirFile(response.data, cadenaUnida, grupo.codP, grupo.tipo));
            GuardarData.setDataSis(response.data);
        //aqui debemos guardar en el fileService 
      
    };

 }, function(response){});
//guardar los datos del Estudiante
    
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
