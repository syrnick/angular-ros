var ngRos = angular.module('ros');

ngRos.directive('rosTopic', function(){
  return {
    priority: 450,
    compile: function() {
      return {
        pre: function(scope, element, attrs) {
          scope.rosTopic = attrs.rosTopic;
        }
      };
    }
  }
});

ngRos.directive('rosMessageType', function(){
  return {
    priority: 450,
    compile: function() {
      return {
        pre: function(scope, element, attrs) {
          scope.rosMessageType = attrs.rosMessageType;
        }
      };
    }
  }
});
