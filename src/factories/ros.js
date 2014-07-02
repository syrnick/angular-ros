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
