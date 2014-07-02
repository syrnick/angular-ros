var ngRos = angular.module('ros');

ngRos.directive('rosWs', ['$rootScope',function($rootScope){
  return {
    priority: 450,
    compile: function() {
      return {
        pre: function(scope, element, attrs) {
          $rootScope.rosWebSocketAddress = attrs.rosWs;
        }
      };
    }
  }
}]);
