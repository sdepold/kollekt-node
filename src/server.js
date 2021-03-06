const BucketManager = require("./bucket-manager")
    , _             = require("underscore")

var Server = module.exports = function(options) {
  this.options = _.extend({
    port: 2323,
    socketLib: require('dgram')
  }, options || {})
  this.socket = this.options.socketLib.createSocket("udp4")
  this.bucketManager = new BucketManager()
}

Server.prototype.start = function() {
  var self  = this
    , bytes = 0

  this.socket.on("message", function(msg, rinfo) {
    if(process.env.DEBUG) {
      bytes += msg.length

      if((+new Date % 1000) == 0)
        console.log("Mb/s:", (bytes * 8) / 1024 / 1024)
    }

    self.handleRequest(msg.toString())
  })

  this.socket.on("listening", function() {
    var address = this.address()
    console.log("server listening " + address.address + ":" + address.port)
  })

  this.socket.bind(this.options.port);
}

Server.prototype.handleRequest = function(message) {
  this.checkForExpiredBuckets()
  this.requestBucket(message)
}

Server.prototype.requestBucket = function(message) {
  var messageSplit = message.split(';')
    , bucketKey    = messageSplit[0]
    , bucketValue  = messageSplit[1]
    , bucket       = this.bucketManager.add(bucketKey)

  bucket.track(bucketValue)
}

Server.prototype.checkForExpiredBuckets = function() {
  this.bucketManager.logExpired()
}
