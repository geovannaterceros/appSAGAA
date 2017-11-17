angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, GuardarData, sisFactory, $location, $ionicPlatform, SagaaService, ListaEstServ, $ionicPopover, $ionicHistory, $ionicPopup, $rootScope, $stateParams, $state, ConnectivityMonitor, $interval) {
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
  /// Open the login modal
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
  $scope.currState = $state;
  var currentSate = $state.current.name;
  //console.log($state.current.name); 
  var myPopup = $ionicPopup.show({
     title: '¿Deseas trabajar offline?',
     buttons: [{
                text: '<b>NO</b>',
                type: 'button-positive',
                onTap: function(e) {  
                    window.localStorage.removeItem('id_token');
                    window.localStorage.removeItem('id_request');
                    $ionicHistory.clearCache().then(function(){
                        $location.path("/inicio");
                    });
                        return null;
                }},
                {
                    text: '<b>SI</b>',
                    type: 'button-positive',
                    onTap: function(e) { 
                        if($state.current.name == "app.informacion" ||  $state.current.name == "app.materias"){
                        $ionicHistory.clearCache().then(function(){
                            $location.path("/inicio");
                        });
                    }else{
                        alert("Debe descargar la planilla de notas");
                    }
                    return null;
                }
                }]
            });

  }
  // Menu guarda el archivo sis
  // Menu Derecho
  /* Guardar el json localmente o subimos al servidor local y el se encargara
   * de subirlo cuando el servidor del sagaa este disponible
  */
  $scope.guardarLE = function(){
    var grupo  = ListaEstServ.getcodP();
    var listaE = GuardarData.getDataSis();
    var data = [];
    data.push(grupo);
    data.push(listaE);
  //  console.log(data);
    $timeout( function() {
      sisFactory.postDataSis( data )
      .then(function(result){
           // $timeout( function(){
           // sagaaGuardar(listaE);
           // $rootScope.$apply(); 
           // mostrarModificado();
           // });
           /* document.addEventListener('deviceready', function () {
                cordova.plugins.backgroundMode.enable();
                cordova.plugins.backgroundMode.on('enable', function() {
                });
                cordova.plugins.backgroundMode.on('activate', function(){
                        enviarBackground(data); 
                        console.log(cordova.plugins.backgroundMode.isActive());
                }); 
            }, false);*/
    });
    });
  };
  /*function enviarBackground(data){
    var promise = $interval(function(){
        if(ConnectivityMonitor.isOnline()){
            //console.log(window.localStorage.getItem('id_request'));
            if(data){
              $timeout( function() {
                  var user = {
                      username : window.local.Storage.getItem('username'),
                      password : window.local.Storage.getItem('password')}
                     sisFactory.posDataUsuario(user).then(function(result){
                    //console.log("response of DataUsuario");
                    //console.log(result);
                }).catch(function(result){
                    //Si la respuesta es diferente a 200 mostrara un alerta
                   console.log(result);  
                });
              });
             /* $timeout( function() {
                sisFactory.postDataSis(data)
                    .then(function(result){
                        window.localStorage.removeItem('id_request');
                        console.log("Ha sido guardado en el servidor, sin problemas");
                        cordova.plugins.backgroundMode.disable();//debe parar el siclo
                        console.log(cordova.plugins.backgroundMode.isActive());
                        $interval.cancel(promise);
                    }).catch(function(e){
                            console.log(error);
                    });
              });
             }
        }
    },3000);

                   $location.path("/materias");
  };*/
 //Cerrar la lista de archivo sis
 $scope.cerrarLE = function(){
    //console.log("cerrar la lista de estudiantes");
    $location.path("/seleccionar");
 };
 //Menu Izquierdo
 $scope.abrirEstudiante = function(){
    $location.path("/estudiantes");
    //console.log("entro abrir estudiante");
 };

 $scope.cerrarMateria = function(){
    $location.path("/seleccionar");
    //console.log("cerrar materia");
 }
      if($ionicHistory.currentStateName() == "app.inicio"){
        $scope.mostrarAtras = true;
      }else{
        $scope.mostrarAtras = false;
      }
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
.controller('InicioCtrl', function($scope, $location, $timeout, $ionicPopup, ConnectivityMonitor, sisFactory, SagaaService, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, $ionicHistory, Usuario){
//para eliminar que se muestre los menu izquierdo
    $ionicSideMenuDelegate.canDragContent(false);
//Beging ionic material design

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
//Then ionic material design

    $scope.user = {};
    $scope.login = function () {
       // console.log($scope.user);
       //verifica los datos de entrada
        if(typeof($scope.user)=='undefined'|| typeof($scope.user.username)=='undefined'|| typeof($scope.user.password)=='undefined'){
            $scope.showAlert('Debe ingresar usuario y password.');
         }else{
             //no existe wifi disponible
             //controla el wifi en el dispositivo
         //   console.log(ConnectivityMonitor.isOnline());
            if(ConnectivityMonitor.isOnline()){
           //     console.log(ConnectivityMonitor.isOnline());
                //connectarme a mi servidor auxiliar
                //This petion, interceptor in service
                //cuando hacemos peticiones al servidor
                $timeout( function() {
                sisFactory.posDataUsuario($scope.user).then(function(result){
                    $timeout( function() {
                    if(window.localStorage.getItem('guardar')){
                    $timeout( function() {
                        SagaaService.getAllSagaas()
                        .then( function( sagaas ) {
                            console.log(sagaas);
                            var dato = getDato(sagaas);
                                if(dato){
                                guardarSIS(dato);
                            }
                        });
                      });
                      };
                    });
                }).catch(function(result){
                    //Si la respuesta es diferente a 200 mostrara un alerta
                 //  console.log(result);  
                });
                });
            }else{
                var myPopup = $ionicPopup.show({
                title: '¿Deseas trabajar offline?',
                buttons: [{
                    text: '<b>NO</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                          $ionicHistory.clearCache().then(function(){
                            $location.path("/inicio");
                          });
                        return null;
                    }},
                    {
                    text: '<b>SI</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                      //  console.log("mostrar factory token:" + window.localStorage.getItem('id_token'));
                        var usernameOff = window.localStorage.getItem('username');
                        var passwordOff = window.localStorage.getItem('password');
                        //console.log(usernameOff);
                        //console.log(passwordOff);
                        if($scope.user.username ===  usernameOff && $scope.user.password === passwordOff){
                            //console.log("ya existe te muestra" + window.localStorage.getItem('id_token'));
                            $location.path("app/gestion");
                            return null;
                        }else{
                            alert("Modo Offline solo funciona para la sesion de " + usernameOff+", los datos ingresados no son del usuario " + usernameOff);
                            return null
                        }
                        return null;
                        }
                    }]
            });
            defered.resolve(data);
            };
        };
    };
    function guardarSIS(datos){
    var grupo = {codP : window.localStorage.getItem('codP'), 
                 tipo : window.localStorage.getItem('tipo')};
    var idUsuario = buscarDato(datos, 'usuario');
    var idGestion =  buscarDato(datos, 'gestion');
    var nombreArc =  buscarDato(datos, 'carrera');
    var pcd = buscarDato(datos, 'pcd');
    var data = [];
    data.push(grupo);
    data.push(pcd);
    data.push(idUsuario);
    data.push(idGestion);
    data.push(nombreArc);
    console.log(data);
       $timeout( function() {
                    sisFactory.postDataSis(data)
                    .then(function(result){
                            console.log("Ha sido guardado en el servidor, sin problemas");
                     }).catch(function(e){
                            console.log(e);
                    });
       });
    }
    function buscarDato(id, dato){
        console.log(dato);
        var idAux;
        var aux;
        for (var i= 0;  i < id.length; i++){
            aux = id[i];
            if(dato ===  'pcd'){
                if(aux.pcd){
                    i = aux.length;
                    idAux = aux;
                }
            }else{
                if(dato ===  'carrera'){
                    if(aux.nombreArc){
                        i = aux.length;
                        idAux = aux.nombreArc
                    }
                }else{
                    if(dato === 'gestion'){
                        if(aux.id){
                        i = aux.length;
                        idAux = aux.id;
                        }
                    }else{
                        if(dato === 'usuario'){
                            if(aux.idUsuario){
                                console.log(aux.idUsuario);
                                i = aux.length;
                                idAux = aux.idUsuario;
                            }
                        }
                    }
                }
            }
        }
        console.log(idAux);
        return idAux;
    }
    function getDato(sagaa){
        console.log(sagaa);
        var dato = [];
        for(var i = 0; i<sagaa.length; i++){
            var aux = sagaa[i];
       //     console.log(aux);
           if(aux.hasOwnProperty("pcd")){
               console.log(aux)
                var pcd = { pcd: aux.pcd};
              //  delete pcd._id;
              //  delete pcd._rev;
                console.log(pcd);
                dato.push(pcd);
            }else{
            if(!aux.hasOwnProperty("pcd")& !aux.hasOwnProperty("carrera")){
                console.log(aux);
                var gestion = {id : aux.id,
                               name : aux.name,
                               idUsuario : aux.idUsuario};
                //delete gestion._id;
                //delete gestion._rev;
                console.log(gestion);
                dato.push(gestion)
            }else{
            if(!aux.hasOwnProperty("pcd") &  !aux.hasOwnProperty("name")){
                console.log(aux);
                var carrera = { nro : aux.nro,
                                carrera : aux.carrera,
                                nombreArc : aux.nombreArc,
                                numeroDC : aux.numeroDC,
                                ultimaDC : aux.ultimaDC,
                                descarga : aux.descargar,
                                zip : aux.zip
                };
                //delete carrera._id;
                //delete carrera._rev;
                console.log(carrera);
                dato.push(carrera);
            }
            }
            }
        }
        console.log(dato);
        return dato;
    }

  /* $scope.login = function(user) {

       //verifica los datos de entrada
        if(typeof(user)=='undefined'|| typeof(user.username)=='undefined'|| typeof(user.password)=='undefined'){
            $scope.showAlert('Debe ingresar usuario y password.');
         }else{
             //no existe wifi disponible        if(ConnectivityMonitor.isOnline()){
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
.controller('GestionCtrl', function($scope, $timeout, sisFactory, $location, GestionDato, UsuarioDato, $state, $ionicPlatform , $ionicLoading, SagaaService, ObjetoService, $ionicPopup, $ionicHistory, ConnectivityMonitor ){
    $ionicHistory.clearCache();
    
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });

    setTimeout( function() {
        sisFactory.posDataGestion()
        .then( function( result ) {
              //  console.log( result );
              //  console.log( 'idUsuario:' + result[0].idUsuario );
                UsuarioDato.setUsuario( result[0].idUsuario );
                mostrarG(result);//no esta envuelto en SagaaService
        }).catch( function ( result ) {
            $timeout( function() {
                SagaaService.getAllSagaas()
                    .then( function( sagaas ) {
                        offGestion( sagaas );
                    });
            });
        });
    });
    function mostrarG(dato){
        var json = {};
            for( var i = 0; i < dato.length; i++ ){
                json [i] = dato[i];
            }
            dato.shift();
            $scope.gestiones = dato;
    };
    
    function offGestion(sagaa){
        for(var i = 0; i<sagaa.length; i++){
            var aux = sagaa[i];
           if(!aux.hasOwnProperty("pcd")& !aux.hasOwnProperty("carrera")){
                   //console.log(aux);
                   var gestion  = {id: aux.id,
                                   name: aux.name}
                    console.log(aux);
                    console.log(gestion)
                    var dato = [gestion];
                    $scope.gestiones = dato ;
                    i = sagaa.length;
            };
        };
    };
    function actualizarG(sagaa, dato){
        console.log("gestion:" + sagaa.length);
        if(sagaa.length != 0){
          for(var i = 0; i<sagaa.length; i++){
              var aux = sagaa[i];
               if (aux.hasOwnProperty('name')){
                 console.log("entro" +  aux);
                 console.log(sagaa[i]);
                 SagaaService.deleteSagaa(sagaa[i]);
                 console.log(dato); 
                 SagaaService.addSagaa(dato);
                 i =  sagaa.length;
                }
            };
        }else{
        console.log("entro add gestion");
            SagaaService.addSagaa(dato);
        }
    };

    $scope.gestionSelec = function (g ){
        GestionDato.setGestion(g);
        //console.log(GestionDato.getGestion(g));
        var dato = {
            idGestion : g.id,
           // nameGestion: g.name,
            idUsuario : UsuarioDato.getUsuario()
        };
        var offlineGestion = {
            id : g.id,
            name: g.name,
            idUsuario : UsuarioDato.getUsuario()
        }
        if(ConnectivityMonitor.isOnline()){
        $timeout( function(){
            SagaaService.getAllSagaas()
            .then( function( sagaas ){
                console.log(offlineGestion);
                console.log(dato);
                actualizarG(sagaas, offlineGestion);
        
            });
        });
        };
    setTimeout(function() {//revisar que funcione
        sisFactory.posDataCarrera(dato).then(function(result){
        //console.log(((result)[0])[0]);
        if((((result)[0])[0]) ==  "No tiene ninguna planilla para descargar para esta gestión!"){
           // console.log("NO hay planilla");
                $ionicPopup.alert({
                title: 'Importante',
                template: (((result)[0])[0]),
                });
        }else{
            //console.log("si tiene planilla");
            $location.path("/app/seleccionar");
        }
    }).catch(function(result){
        $location.path("/app/seleccionar");
    });
    });
    };

})
.controller('SeleccionarCtrl', function($scope ,$location ,$state , $timeout, $ionicPlatform, GestionDato, UsuarioDato, CarreraDato,sisFactory, SagaaService, $ionicHistory, ConnectivityMonitor ){
    $ionicHistory.clearCache();
  //  console.log(GestionDato.getGestion());
  //  console.log(GestionDato.getGestion().id)
  //  console.log(UsuarioDato.getUsuario()); 
    var dato = {
                idGestion : GestionDato.getGestion().id,
                idUsuario : UsuarioDato.getUsuario()
    }

    sisFactory.posDataCarrera(dato).then(function(result){
    //    console.log(result);
  //      console.log(((result)[0])[0]);
        if((((result)[0])[0]) !=  "No tiene ninguna planilla para descargar para esta gestión!"){
        mostrarS(result);
        }else{
            $scope.error = (result);
        }
    }).catch(function(result){
        $timeout(function(){
            SagaaService.getAllSagaas().then(function(sagaas){
               // console.log(sagaas);
                offSeleccionar(sagaas);
            });
        });
       //console.log("tenemos error");
    });
    function mostrarS(dato){
        var json = {};
        for( var i = 0; i < dato.length; i++ ){
            json [i] = dato[i]; 
            $scope.carreras = json;
        }
    }
    function actualizarS(sagaa, c){
        console.log("carrera:" + sagaa.length);
        if(sagaa.length != 1){
          for(var i = 0; i<sagaa.length; i++){
              //console.log(sagaa[i]);
              //console.log(sagaa.length);
              var aux =  sagaa[i];
               if(aux.hasOwnProperty("carrera")){
       //            console.log(sagaa[i]);
                   SagaaService.deleteSagaa(sagaa[i]);
                   //console.log(c);
                   SagaaService.addSagaa(c);
                  //SagaaService.updateSagaa(dato);
                   i =  sagaa.length;
              };
            };
        }else{
            console.log("entro add carrera")
            SagaaService.addSagaa(c);
        }
    };
    function offSeleccionar(sagaa){
        for(var i = 0; i<sagaa.length; i++){
            var aux = sagaa[i];
            if(!aux.hasOwnProperty("pcd") &  !aux.hasOwnProperty("name")){
                //var carrera = aux;
                var carrera = { nro : aux.nro,
                                carrera : aux.carrera,
                                nombreArc : aux.nombreArc,
                                numeroDC : aux.numeroDC,
                                ultimaDC : aux.ultimaDC,
                                descarga : aux.descargar,
                                zip : aux.zip
                };
                //console.log("carrera_id" + carrera._id);
                //delete carrera._id;
                //delete carrera._rev;
                var dato = [carrera];
                $scope.carreras = dato;
                //console.log(carrera);
                i= sagaa.length;
            }
        }
    };
    
    $scope.listaC = function (c){
        //console.log(c);
        CarreraDato.setCarrera(c);
        if(ConnectivityMonitor.isOnline()){
        $timeout(function(){
            SagaaService.getAllSagaas().then(function(sagaas){
                //console.log(c);
                actualizarS(sagaas, c);
            });
        });
        };
        $location.path("/app/detalle");
    }
})
.controller('DetalleCtrl', function($scope, CarreraDato, sisFactory, SagaaService, $timeout, $location, $ionicPlatform, $ionicHistory, ConnectivityMonitor ){
    $ionicHistory.clearCache();
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });
  //  console.log(CarreraDato.getCarrera())
    $scope.detalle = CarreraDato.getCarrera();
    //console.log("estamos mostrando el detalle de");

    $scope.descargar = function(carrera){
      //  console.log(carrera);
        //descarga el archivo al websql en el cell how json 
        sisFactory.posDataDetalle(carrera).then(function(result){
           $timeout(function(){
                SagaaService.getAllSagaas()
                .then(function(sagaas){
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
        //console.log("entro actualizar")
            //debo change los datos de sagaa length
        console.log("pcd:" + sagaa.length);
        if(sagaa.length == 3){
          for(var i = 0; i<sagaa.length; i++){
            var aux = sagaa[i];
  //          console.log(aux);
            if(aux.hasOwnProperty("pcd")){
             SagaaService.deleteSagaa(aux);
             console.log(sagaa.length);
             SagaaService.addSagaa(dato);
             i = sagaa.length;
            }
          }
            //dudasss q muestra carreras
        }else{
            console.log("entro add pcd");
            SagaaService.addSagaa(dato);
        }
    };
    function offDetalle(sagaa){
        //console.log("offDetalle");
        for(var i = 0; i<sagaa.length; i++){
            var aux = sagaa[i];
            if( aux.hasOwnProperty("pcd")){
                //console.log(sagaa[i]);
               $scope.detalle =  aux ;
               i = sagaa.length;
            }
        }
    };
})
//Obtener la Informacion Docente, Carrera, Facultad
.controller('InformacionCtrl', function($scope, $ionicPlatform, $timeout, SagaaService, sisFactory, CrearBDServ, $window, $ionicHistory, ConnectivityMonitor ) {
    $ionicHistory.clearCache();
  //  console.log("factory");
  //  console.log($window.innerWidth);
  //  console.log($window.innerHeight);

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
               // console.log('esta en el buscar Dato');
                buscarData(sagaas);
           }, 300);
        });
    });
    function buscarData(sagaas){
        var names = sagaas.map(function(elemento) {
            //console.log(elemento);
            return elemento;
        });
        for(var i = 0; i < sagaas.length; i++){
            if(sagaas[i].pcd){
                var aux = sagaas[i];//debp ,mirar
              //  console.log(aux);
                var info = CrearBDServ.divFile(aux, 'informacion');
                var infoA = CrearBDServ.sepDatos(info);
                var infoD = CrearBDServ.crearBDInf(infoA);
                $scope.datos = infoD;
            }
        }
    }
})
.controller('MateriasCtrl', function($scope, $ionicPlatform, $timeout, SagaaService, sisFactory, CrearBDServ, ListaEstServ){
  //  console.log("materias");
    var data = {};
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });
    $timeout(function(){
        SagaaService.getAllSagaas().then(
        function(sagaas){
          //  console.log('materia buscar DAta materia');
            buscarData(sagaas);
    //sisFactory.getDataSis().then(
    //    function(result){
    //        console.log(result);
            var g = function(tipo){
                var array = [];
                var arrayObj = [];
                var x = 0;
                var grupo = CrearBDServ.divFile(data, tipo);
                //console.log(grupo);
                var grupoA = CrearBDServ.sepDatos(grupo[0]);
                //console.log(grupoA);
                var grupoT = (grupoA.length)/13;
                //console.log(grupoT);
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
        //console.log("cdoP:" + codP);
  //      console.log("tipo:" + tipo);
        ListaEstServ.setcodP(codP, tipo);
        var codigoP = { codP : codP,
                        tipo : tipo}
        //console.log(codigoP);
        if(!window.localStorage.getItem('codP')){
            window.localStorage.setItem('codP', codP);
            window.localStorage.setItem('tipo', tipo);
        }else{
            window.localStorage.removeItem('codP');
            window.localStorage.removeItem('tipo');
            window.localStorage.setItem('codP', codP);
            window.localStorage.setItem('tipo', tipo);
        }
    }

    function buscarData(sagaa){
        var aux;
        for(var i = 0; i< sagaa.length; i++){
            aux = sagaa[i]
            if(aux.pcd){          
                data = aux;
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
    //console.log("Mis parametro q me llega del otro controlador:");
    //console.log(grupo);
    //console.log("fin del parametro grupo");
    var arrayObj =[];
    var data = {};
    $ionicPlatform.ready(function() {
        SagaaService.initDB();
    });
    $timeout(function(){
      SagaaService.getAllSagaas().then(
        function(sagaas){
          buscarData(sagaas);
           var l = function(numId){
            var array = [];
            var x = 0;//repartir
            var lista = CrearBDServ.divFile(data ,grupo.codP);//devuelve una cadena de datos 
            var listaA = CrearBDServ.sepDatos(lista[0]);//separa por coma y quita la primera y ultima q son vacios 
            var listaT = (listaA.length)/numId;//cantidad de estudiantes depende la materia 7(mesa) o 11(normal)
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
        //empezar a unir en el filei
        //    sagaaGuardar(CrearBDServ.unirFile(data, cadenaUnida, grupo.codP, grupo.tipo));
        //console.log(data);
        GuardarData.setDataSis(CrearBDServ.unirFile(data, cadenaUnida, grupo.codP, grupo.tipo));
        //aqui debemos guardar en el fileService 
        };
     });
});
//guardar los datos del Estudiante
  function buscarData(sagaa){
      var aux;
      for(var i = 0; i< sagaa.length; i++){
          aux = sagaa[i];
            if(aux.pcd){
                //console.log(sagaa.length);
                //console.log(aux);
                //delete aux._id;
                //delete aux._rev;
                data = aux;
            }
        }
  };
})
/*.controller('FileCtrl', function($scope, sisFactory) {

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
})*/;
