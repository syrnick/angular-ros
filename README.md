# angular-ros POC

This is a simple proof-of-concept for angular-ros

This is a simple app that shows how Angular makes ROS webapps pretty
easy. With the right directives and helpers you mostly configure
everything in markup: topics, message types, connection details, etc.

This example shows a message sender, receiver and an action lib
client. To run the example:
 * launch rosbridge
 * launch Fibbonacci server from the tutorial
 * launch something that publishes on /chatter

 The example shows how to react to the connection established.

# Ideas:

* Tests!
* Dynamic response to attributes, so that you can change topics on the fly.
* Proper support for namespaces, so that it pick up the namespace from
  parent tags. This should display messages from topic /another/example/chatter

```
<div ros-namespace='/another/>
  <div ros-namespace='/example/>
    <div ros-topic="/chatter">
      <div ng-controller="TopicListnerCtl" >
        {{messages}}
      </div>
    </div>
  </div>
</div>
```

* Some common display templates for common message types, so that it's easy to compose views
