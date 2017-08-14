describe('feature: Registrar notas', function(){
    var scope;
    var timeout, ionicPopup;
         ionicPopup = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
    beforeEach(module('starter.controllers'));
    beforeEach(module('ConnectivityMonitor'));
    beforeEach(module('sisFactory'));
    beforeEach(module('SagaaService'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();                                              
        $controller('AccountCtrl', {$scope: scope, $timeout: timeout, $ionicPopup: ionicPopup});
    it('should have enabled friends to be true', function(){
       // expect(scope.init).toBeDefined();
        expect(scope.settings.enableFriends).toEqual(true);
    });
    }));                               
});
    /*beforeEach(module('ConnectivityMonitor'));

    var $controller, scope;
    var usuario = {username: 'undefined', password: 'undefined'}

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    describe('datos null', function(){
        beforeEach(inject(function($rootScope, $controller) {

            scope = $rootScope.$new();
            $controller('InicioCtrl', {$scope: scope});
    
        }));
        it('no llena datos y envia undefined', function(){
    //$scope.settings = {
    //    enableFriends: true
    //};
            expect(scope.settings.enableFriends).toEqual(true);
        });
    });*/
