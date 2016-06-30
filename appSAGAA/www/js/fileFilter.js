angular.module('starter.filter', [])
.filter('inputOPC', function(){
    return function(input){
            console.log(input);
            return input;
    };
});
