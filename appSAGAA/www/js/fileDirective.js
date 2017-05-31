angular.module('starter.directive', [])
.directive('fileOpcion', function(){
    return {
        require : "ngModel",
        restrict : 'A',
        scope : true,
        link : function(scope, element, attrs, ctrl){
                element.bind("keyup", function(){
                    var esNumero = function(input){
                        var numberRe = /^[1-9][0-9]*$/;
                        var inputValue = numberRe.test(input);
                        return inputValue;
                    };
                    var valor = esNumero(ctrl.$viewValue);
                    scope.inputCtrl = ctrl;
                    if(valor){
                    console.log("directive::" + valor);
                    }
                    else{
                    console.log("No puedes escribir mas");
                    }
                    
                    scope.$watch('inputCtrl.$valid', scope.mostrar(valor));  
                    ctrl.$render();
                });
        }
    };
})
.directive('onlyNum', function() {
    return {
        require : "ngModel",
        restrict : 'A',
        scope : true,
        link : function(scope, element, attrs, ctrl){
                var antVal ;
                element.bind("keyup", function(){
                var pattern = /^[1-9][0-9]?$|^100$/g;
                var patternMax = /^[1-9][0-9]{2,3}$/g;
                var patternVal = /^[1-9][0-9]*$/g
                    var val = element.val();
                    var valorV = pattern.test(val);
                    var valorM = patternMax.test(val);
                    var valorVal = patternVal.test(val); 
                    var newVal = val.replace(pattern, '');
                    var srch = val.match(pattern);
                        if ( valorV) {
                            element.val(val);
                            antVal = val;
                       }else{
                           if(val.length == 1 || val.length == 0){
                                element.val('');
                           }else{
                                element.val(antVal);
                           }
                       }
                    scope.inputCtrl = ctrl;
                    console.log(attrs.ngModel);
                    if(attrs.ngModel == "estudiante.ERPAR" || attrs.ngModel == "estudiante.DOPAR" || attrs.ngModel == "estudiante.EXAFIN" || attrs.ngModel == "estudiante.da"){
                        scope.$watch('inputCtrl.$valid', scope.mostrarN(valorVal, valorM, element.val(), attrs.opcion));
                    }else{
                        scope.$watch('inputCtrl.$valid', scope.mostrar(valorVal, valorM, element.val(), attrs.opcion));  
                    }
                });

        }
    }
})
.directive('notaNormal', function(){
    return {
        require : "ngModel",
        restric : "A",
        scope : true,
        link : function(scope, element, attrs, ctrl){
            var antVal ;
            element.bind('keyup', function(){
                var pattern = /^[1-9][0-9]?$|^100$/g;
                var patternMax = /^[1-9][0-9]{2,3}$/g;
                var patternVal = /^[1-9][0-9]*$/g
                
                console.log(element.val());
            });
        }
    };
});
