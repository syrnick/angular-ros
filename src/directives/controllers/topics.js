var ngRos = angular.module('ros');

ngRos.controller('TopicListnerCtl', ['$scope', 'rosConnection', function($scope, rosConnection) {
  $scope.listener = new ROSLIB.Topic({
    ros : rosConnection,
    name : $scope.rosTopic,
    messageType : $scope.rosMessageType,
  });

  $scope.messages = [];

  $scope.listener.subscribe(function(message) {
    $scope.$apply(function(){
      $scope.messages.push(message);
      if($scope.messages.length > 10){
        $scope.messages.unshift();
      }
    });
  });
}]);

ngRos.controller('TopicPublisherCtl', ['$scope', 'rosConnection', function($scope, rosConnection) {
  $scope.ros = rosConnection;
  $scope.publisher = new ROSLIB.Topic({
    ros : rosConnection,
    name : $scope.rosTopic,
    messageType : $scope.rosMessageType
  });

  $scope.message = {};

  $scope.sendMessage = function(){
    var msg = new ROSLIB.Message($scope.message);
    $scope.publisher.publish(msg);
  };
}]);
