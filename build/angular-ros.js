// From http://docs.ros.org/api/actionlib_msgs/html/msg/GoalStatus.html
var goalStatusNames =
  [
    "PENDING",     // The goal has yet to be processed by the action server
    "ACTIVE",      // The goal is currently being processed by the action server
    "PREEMPTED",   // The goal received a cancel request after it started executing
                   //   and has since completed its execution (Terminal State)
    "SUCCEEDED",   // The goal was achieved successfully by the action server (Terminal State)
    "ABORTED",     // The goal was aborted during execution by the action server due
                   //    to some failure (Terminal State)
    "REJECTED",    // The goal was rejected by the action server without being processed,
                   //    because the goal was unattainable or invalid (Terminal State)
    "PREEMPTING",  // The goal received a cancel request after it started executing
                   //    and has not yet completed execution
    "RECALLING",   // The goal received a cancel request before it started executing,
                   //    but the action server has not yet confirmed that the goal is canceled
    "RECALLED",    // The goal received a cancel request before it started executing
                   //    and was successfully cancelled (Terminal State)
    "LOST"         // An action client can determine that a goal is LOST. This should not be
                   //    sent over the wire by an action server
  ];

ROSLIB.Goal.prototype.statusName = function(){
  if(typeof this.status === "undefined"){
    return goalStatusNames[0];
  }
  return goalStatusNames[this.status.status];
};

var ngRos = angular.module('ros', []);

var ngRos = angular.module('ros');

ngRos.factory('rosConnection', ['$rootScope', function ($rootScope) {
  var ros = new ROSLIB.Ros();

  ros.connected = false;

  // If there is an error on the backend, an 'error' emit will be emitted.
  ros.on('error', function(error) {
    console.log(error);
  });

  // Find out exactly when we made a connection.
  ros.on('connection', function() {
    $rootScope.$apply(function(){
      ros.connected = true;
    });
    console.log('Connectionp made!');
  });

  // Create a connection to the rosbridge WebSocket server.
  var rosWebSocketAddress = 'ws://localhost:9090';
  if( typeof( $rootScope.rosWebSocketAddress ) !== 'undefined' ){
    rosWebSocketAddress = $rootScope.rosWebSocketAddress;
  }

  ros.connect( rosWebSocketAddress )

  return ros;
}]);

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

  $scope.sendMessage = function(extraMsg){
    if(typeof(extraMsg)=="undefined"){
      extraMsg={};
    }
    var msg = new ROSLIB.Message(jQuery.extend(extraMsg,$scope.message));
    $scope.publisher.publish(msg);
  };
}]);

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
