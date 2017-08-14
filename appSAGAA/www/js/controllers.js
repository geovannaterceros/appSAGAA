angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, GuardarData, sisFactory, $location, $ionicPlatform, SagaaService, ListaEstServ, $ionicPopover) {
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });

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
  //Logout
  $scope.logout = function(){
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('id_request');
    $location.path("/inicio");
    console.log("cerrar session");
  }
  // Menu guarda el archivo sis
  // Menu Derecho
  /* Guardar el json localmente o subimos al servidor local y el se encargara
   * de subirlo cuando el servidor del sagaa este disponible
  */
  $scope.guardarLE = function(){
    console.log("ya podemos guardar");

    var grupo  = ListaEstServ.getcodP();
    var listaE = GuardarData.getDataSis();
    var data = [];
    data.push(grupo);
    data.push(listaE);
    sisFactory.postDataSis( data )
    .then(function(result){
        console.log("Ha sido guardado en el servidor, sin problemas");
    }).catch(function(){
        alert("Vamos a guardar localmente los datos, porque no tenemos connecion de datos, wifi");
        SagaaService.updateSagaa(data);
        $location.path("/materias");
    });
  }
  function eliminaBusca(sagaa){
    console.log(sagaa);
    for(var i = 0; i< sagaa.length; i++){
        if(sagaa[i].pcd){
            console.log(sagaa[i].pcd);
            SagaaService.deleteSagaa(sagaa[i]);
        }
    }
  }
 //Cerrar la lista de archivo sis
 $scope.cerrarLE = function(){
    console.log("cerrar la lista de estudiantes");
    $location.path("/seleccionar");
 };
 //Menu Izquierdo
 $scope.abrirEstudiante = function(){
    $location.path("/estudiantes");
    console.log("entro abrir estudiante");
 };

 $scope.cerrarMateria = function(){
    $location.path("/seleccionar");
    console.log("cerrar materia");
 }
      if($ionicHistory.currentStateName() == "app.inicio"){
        $scope.mostrarAtras = true;
      }else{
        $scope.mostrarAtras = false;
      }
    console.log($ionicHistory.currentStateName());
    console.log("volver atras");
//Ionic Material Design

    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('PlaylistsCtrl', function($scope, $ionicModal, $ionicPlatform ) {
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
.controller('InicioCtrl', function($scope, $location, $timeout, $ionicPopup, ConnectivityMonitor, sisFactory, SagaaService, $stateParams, ionicMaterialInk){
//Beging ionic material design

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
//Then ionic material design

    $scope.user = {};
    $scope.login = function () {
        console.log($scope.user);
       //verifica los datos de entrada
        if(typeof($scope.user)=='undefined'|| typeof($scope.user.username)=='undefined'|| typeof($scope.user.password)=='undefined'){
            $scope.showAlert('Debe ingresar usuario y password.');
         }else{
             //no existe wifi disponible
            if(ConnectivityMonitor.isOnline()){
                console.log(ConnectivityMonitor.isOnline());
                //connectarme a mi servidor auxiliar
                //This petion, interceptor in service
                //cuando hacemos peticiones al servidor
                sisFactory.posDataUsuario($scope.user).then(function(result){
                    console.log("response of DataUsuario");
                }).catch(function(result){
                    //   $scope.showAlert("Error en la contrasenha o login, vuelva a intentarlo");
                    console.log(result);
                    });
            }else{
                //usamos en modo offline sin comunicacion externa
                alert('Se esta utilizando en modo offline sin wifi y sin conneccion de datos, verificando si tiene session guardada');

                if(window.localStorage.getItem('id_token')){
                    alert('Se esta utilizando en modo offline, ha recuperado su session anterior de los datos del celular');
                    console.log(window.localStorage.getItem('id_token'));
                    $location.path("app/gestion");
                }else{
                    alert('No se puede utilizar en modo offline porque no ha creado anteriormente su cuenta.');
                 //    $scope.showAlert("No hay conneccion a internet");
                     console.log(ConnectivityMonitor.isOnline());
                     $location.path('/app/inicio');
                    }
                }
        }
    };
  /* $scope.login = function(user) {

       //verifica los datos de entrada
        if(typeof(user)=='undefined'|| typeof(user.username)=='undefined'|| typeof(user.password)=='undefined'){
            $scope.showAlert('Debe ingresar usuario y password.');
         }else{
             //no existe wifi disponible
            if(ConnectivityMonitor.isOnline()){
                console.log(ConnectivityMonitor.isOnline());
                //connectarme a mi servidor auxiliar
                //This petion, interceptor in service
                //cuando hacemos peticiones al servidor
                sisFactory.posDataUsuario(user).then(function(result){
                    console.log("response of DataUsuario");
                }).catch(function(result){
                    //   $scope.showAlert("Error en la contrasenha o login, vuelva a intentarlo");
                    console.log(result);
                    });
            }else{
                //usamos en modo offline sin comunicacion externa
                alert('Se esta utilizando en modo offline sin wifi y sin conneccion de datos, verificando si tiene session guardada');

                if(window.localStorage.getItem('id_token')){
                    alert('Se esta utilizando en modo offline, ha recuperado su session anterior de los datos del celular');
                    console.log(window.localStorage.getItem('id_token'));
                    $location.path("app/gestion");
                }else{
                    alert('No se puede utilizar en modo offline porque no ha creado anteriormente su cuenta.');
                 //    $scope.showAlert("No hay conneccion a internet");
                     console.log(ConnectivityMonitor.isOnline());
                     $location.path('/app/inicio');
                    }
                }
        }
  };*/
  //----------------Falta hacer el logout----------------------------

  $scope.logout = function() {
      $location.path('/app/inicio');
  };
  //--------------------------------------------
   // An alert dialog
   $scope.showAlert = function(msg) {
       var alertPopup = $ionicPopup.alert({
	 title: '!Importante!',
	 template: msg
   });
 };
    $scope.settings = {
        enableFriends: true
    };
})
.controller('GestionCtrl', function($scope, $timeout, sisFactory, $location, GestionDato, UsuarioDato, $state, $ionicPlatform , $ionicLoading, SagaaService, ObjetoService){
    
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });

    setTimeout( function() {
        sisFactory.posDataGestion()
            .then( function( result ) {
                console.log( result );
                console.log( 'idUsuario:' + result[0].idUsuario );
                UsuarioDato.setUsuario( result[0].idUsuario );
                $timeout( function(){
                    SagaaService.getAllSagaas()
                        .then( function( sagaas ){
                            actualizar( sagaas, result ); 
                        });
                });
        }).catch( function ( result ) {
            $timeout( function() {
                SagaaService.getAllSagaas()
                    .then( function( sagaas ) {
                        offGestion( sagaas );
                    });
            });
          //  console.log("tenemos error");
        });
    });
    function actualizar( sagaa, dato ){
        var json = {};
            for( var i = 0; i < dato.length; i++ ){
                json [i] = dato[i];
            }
        if(sagaa.length != 0){
            SagaaService.updateSagaa(json);
            dato.shift();
            $scope.gestiones = dato;
        }else{
            SagaaService.addSagaa( json );
            dato.shift();
            $scope.gestiones = dato;
        }
    };
    
    function offGestion(sagaa){
        for(var i = 0; i<sagaa.length; i++){
            var aux = sagaa[i];
            console.log("tam aux:" + Object.keys(aux).length);
            if(!aux.hasOwnProperty("pcd")){
            for(var j = 0; j < Object.keys(aux).length; j++){
               if ('name' in aux[j]){
                   var gestion = aux;
                    delete gestion[0];
                    delete gestion._id;
                    delete gestion._rev;
                    console.log(gestion);
                   $scope.gestiones = gestion ;
                   j = Object.keys(aux);
                   //debe terminar el ciclo
               }else{
                    i = sagaa.length;
               }
            }
            }
        }
    }
    $scope.gestionSelec = function (g){
        GestionDato.setGestion(g);
        console.log( "la gestion elegida:" + g );
        //window.localStorage.setItem('id_request');
        $location.path("/app/seleccionar");
    }
    //realiza un reload al controller del template cuando se utiliza el update
    //del navegador
    //$state.go($state.current, {}, {reload: true});
})
.controller('SeleccionarCtrl', function($scope ,$location ,$state , $timeout, $ionicPlatform, GestionDato, UsuarioDato, CarreraDato,sisFactory, SagaaService){
    
    console.log(GestionDato.getGestion());
    console.log(UsuarioDato.getUsuario());
    
    var dato = {
                idGestion : GestionDato.getGestion(),
                idUsuario : UsuarioDato.getUsuario()
    }

    sisFactory.posDataCarrera(dato).then(function(result){
        console.log(result);
        $timeout(function(){
            SagaaService.getAllSagaas().then(function(sagaas){
                actualizar(sagaas, result); 
            });
        });
    }).catch(function(result){
        $timeout(function(){
            SagaaService.getAllSagaas().then(function(sagaas){
                console.log(sagaas);
                offSeleccionar(sagaas);
            });
        });
       console.log("tenemos error");
    });

    function actualizar(sagaa, dato){
        var json = {};
            //for para poner en objeto
            for( var i = 0; i < dato.length; i++ ){
                json [i] = dato[i];
            }
        if(sagaa.length != 1){
            SagaaService.updateSagaa(json);
            //carreras q esta guardando creo q nada
            $scope.carreras = json;
        }else{
            SagaaService.addSagaa(json);
            $scope.carreras = json;
        }
    };
    function offSeleccionar(sagaa){
        for(var i = 0; i<sagaa.length; i++){
            var aux = sagaa[i];
            if(!aux.hasOwnProperty("pcd")){
            for(var j = 0; j < Object.keys(aux).length; j++){
                if( aux[j] != undefined){
                 if(!aux[j].hasOwnProperty('name')){
                    if ('carrera' in aux[j]){
                        var carrera = aux;
                        delete carrera._id;
                        delete carrera._rev;
                       $scope.carreras = carrera;
                       j = Object.keys(aux).length;
                    }
                 }else{
                    j = Object.keys(aux).length;
                 }
               }
            }
            }
        }
    };
    
    $scope.listaC = function (c){
        console.log(c);
        CarreraDato.setCarrera(c);
        $location.path("/app/detalle");
    }
})
.controller('DetalleCtrl', function($scope, CarreraDato, sisFactory, SagaaService, $timeout, $location, $ionicPlatform){
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });
    console.log(CarreraDato.getCarrera())
    $scope.detalle = CarreraDato.getCarrera();
    console.log("estamos mostrando el detalle de");

    $scope.descargar = function(carrera){
        console.log(carrera);
        //descarga el archivo al websql en el cell how json 
        sisFactory.posDataDetalle(carrera).then(function(result){
           $timeout(function(){
                SagaaService.getAllSagaas().then(function(sagaas){
                    $timeout(function(){
                        actualizar(sagaas, result); 
                    });
                });
            });
            $location.path("/app/informacion");
        }).catch(function(result){
            $timeout(function(){
                SagaaService.getAllSagaas().then(function(sagaas){
                    $timeout(function(){
                        offDetalle(sagaas); 
                    });
                });
            });
            $location.path("/app/informacion");
        });
        }
    function actualizar(sagaa, dato){
            //debo change los datos de sagaa length
        if(sagaa.length != 2){
            SagaaService.updateSagaa(dato);
            //dudasss q muestra carreras
        }else{
            SagaaService.addSagaa(dato);
        }
    };
    function offDetalle(sagaa){
        for(var i = 0; i<sagaa.length; i++){
            if( sagaa[i].pcd){
                //SagaaService.deleteSagaa(sagaa[i+1]);
               $scope.detalle = sagaa[i]
            }
        }
    };
})
//Obtener la Informacion Docente, Carrera, Facultad
.controller('InformacionCtrl', function($scope, $ionicPlatform, $timeout, SagaaService, sisFactory, CrearBDServ ) {
    console.log("factory");
   // var data = {};
/*    sisFactory.getDataSis().then(function(result){
        data = result;
        var info = CrearBDServ.divFile(data, 'informacion');
        var infoA = CrearBDServ.sepDatos(info);
        var infoD = CrearBDServ.crearBDInf(infoA);
        $scope.datos = infoD;
    }).catch(function(result) {
        console.log('Error en la conneccion' );
    });*/
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });
    $timeout(function(){
        SagaaService.getAllSagaas().then(function(sagaas){
            $timeout( function(){
                buscarData(sagaas);
           }, 3000);
        });
    });
    function buscarData(sagaas){
        var names = sagaas.map(function(elemento) {
            console.log(elemento);
            return elemento;
        });
        for(var i = 0; i < sagaas.length; i++){
            if(sagaas[i].pcd){
                var info = CrearBDServ.divFile(sagaas[i], 'informacion');
                var infoA = CrearBDServ.sepDatos(info);
                var infoD = CrearBDServ.crearBDInf(infoA);
                $scope.datos = infoD;
            }
        }
    }
})
.controller('MateriasCtrl', function($scope, $ionicPlatform, $timeout, SagaaService, sisFactory, CrearBDServ, ListaEstServ){
    var data = {};
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });
    $timeout(function(){
        SagaaService.getAllSagaas().then(
        function(sagaas){
            buscarData(sagaas);
    //sisFactory.getDataSis().then(
    //    function(result){
    //        console.log(result);
            var g = function(tipo){
                var array = [];
                var arrayObj = [];
                var x = 0;
                var grupo = CrearBDServ.divFile(data, tipo);
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
            })
    });

    //enviar parametros entre controlador
    $scope.matEst = function(codP, tipo){
        console.log("tipo Controller:" + codP);
        ListaEstServ.setcodP(codP, tipo);
    }

    function buscarData(sagaa){
        for(var i = 0; i< sagaa.length; i++){
            if(sagaa[i].pcd){
                console.log(sagaa[i]);
                data = sagaa[i];
            }
        }
    }
})
//Mostrar la lista de estudiantes segun la material seleccionanada
.controller('EstudiantesCtrl', function($scope ,$ionicHistory ,$ionicModal ,$ionicPlatform ,$timeout ,SagaaService ,ListaEstServ ,sisFactory ,CrearBDServ, GuardarData){
    //show menu
    $scope.$on('$ionicView.beforeEnter', function (event, data) {
        if(data.enableBack){
          $scope.$root.showMenuIcon = true;
        //$ionicSideMenuDelegate.canDragContent(true);
        }
    });
    var grupo  = ListaEstServ.getcodP();
    console.log("Mis parametro q me llega del otro controlador:");
    console.log(grupo);
    console.log("fin del parametro grupo");
    var arrayObj =[];
    var data = {};
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });
    $timeout(function(){
      SagaaService.getAllSagaas().then(
        function(sagaas){
          buscarData(sagaas);
    //sisFactory.getDataSis().then(function(result){
           var l = function(numId){
            var array = [];
            var x = 0;//repartir
            console.log(data);
            console.log(grupo.codP);
            var lista = CrearBDServ.divFile(data ,grupo.codP);//devuelve una cadena de datos 
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
                    console.log('estudiante.nro'+ arrayObj[i]);
                    arrayObj[i] = estudiante;
                };
                if(arrayObj[i].RAOPC != undefined){//mesa
                    console.log('1raOpc'+ arrayObj[i]);
                    cadenaArray [i] = CrearBDServ.unirDatosMesa(arrayObj[i]); 
                }
                if(arrayObj[i].ERPAR != undefined){//normal
                    console.log('2daOpc'+ arrayObj[i]);
                    cadenaArray [i] = CrearBDServ.unirDatosNormal(arrayObj[i]); 
                }
        };
        cadenaArray.push('');
        cadenaArray.unshift('');
        var cadenaUnida = cadenaArray.join();
            console.log(cadenaUnida);
            console.log("codP"+grupo.codP);
            console.log("tipo"+grupo.tipo);
        //empezar a unir en el file
            GuardarData.setDataSis(CrearBDServ.unirFile(data, cadenaUnida, grupo.codP, grupo.tipo));
        //aqui debemos guardar en el fileService 
        };
     });
});
//guardar los datos del Estudiante
    function buscarData(sagaa){
        for(var i = 0; i< sagaa.length; i++){
            if(sagaa[i].pcd){
                console.log(sagaa[i]);
                data = sagaa[i];
            }
        }
    }
})
.controller('FileCtrl', function($scope, sisFactory) {

    $scope.showContent = function($fileContent){
            $scope.content = $fileContent;
    };

        sisFactory.getDataSis.then(
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
})
.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
