describe('feature: Registrar notas', function(){
    beforeEach(module('starter.controllers'));
    beforeEach(module('ConnectivityMonitor'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    describe('datos null', function(){
        it('no llena datos y envia undefined', function(){
            var $scope = {};
            var controller = $controller('InicioCtrl', {$scope : $scope});
            expect(scope.user);
        });
    });
});
