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
