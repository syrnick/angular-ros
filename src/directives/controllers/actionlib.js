var ngRos = angular.module('ros');

ngRos.controller('ActionClient', ['$scope','rosConnection', function($scope, rosConnection) {
  $scope.newGoal = {}; //{'order': 5};
  $scope.goals = []
console.log( $scope.rosServerName );

  $scope.actionClient = new ROSLIB.ActionClient({
    ros : rosConnection,
    serverName : $scope.rosServerName,
    actionName : $scope.rosActionName
  });

  $scope.sendGoal = function(){
    console.log('send');
    console.log($scope.newGoal);
    console.log($scope.rosServerName);
    console.log($scope.rosActionName)
    var goal = new ROSLIB.Goal({
      actionClient : $scope.actionClient,
      goalMessage : $scope.newGoal
    });

    $scope.goals.unshift(goal);

    $scope.newGoal = jQuery.extend(true, {}, $scope.newGoal);

    // Print out their output into the terminal.
    goal.on('status', function(status) {
      $scope.$apply(function(){
        goal.lastStatus = status;
      });
    });

    goal.on('feedback', function(feedback) {
      $scope.$apply(function(){
        goal.lastFeedback = feedback;
      })
    });

    goal.on('result', function(result) {
      $scope.$apply(function(){
        goal.result = result;
      })
    });

    goal.send();
  };
}]);
