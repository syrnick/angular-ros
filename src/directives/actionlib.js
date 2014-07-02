var ngRos = angular.module('ros');

ngRos.directive('serverName', function(){
  return {
    priority: 450,
    compile: function() {
      return {
        pre: function(scope, element, attrs) {
          scope.rosServerName = attrs.serverName;
        }
      };
    }
  }
});

ngRos.directive('actionName', function(){
  return {
    priority: 450,
    compile: function() {
      return {
        pre: function(scope, element, attrs) {
          scope.rosActionName = attrs.actionName;
        }
      };
    }
  }
});
