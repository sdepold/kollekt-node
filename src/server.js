const BucketManager = require("./bucket-manager")
    , _             = require("underscore")

var Server = module.exports = function(options) {
  this.options = _.extend({
    port: 2323,
    serverLib: require('dgram')
  }, options || {})
  this.server = this.options.serverLib.createSocket("udp4")
  this.bucketManager = new BucketManager()
}

Server.prototype.start = function() {
  var self = this

  this.server.on("message", function(msg, rinfo) {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port)
    self.handleRequest(msg.toString())
  })

  this.server.on("listening", function() {
    var address = this.address()
    console.log("server listening " + address.address + ":" + address.port)
  })

  this.server.bind(this.options.port);
}

Server.prototype.handleRequest = function(message) {
  this.requestBucket(message)
  this.checkForExpiredBuckets()
}

Server.prototype.requestBucket = function(message) {
  var messageSplit = message.split(';')
    , bucketKey    = messageSplit[0]
    , bucketValue  = messageSplit[1]
    , bucket       = this.bucketManager.add(bucketKey)

  bucket.track(bucketValue)

  console.log('Just added ' + bucketValue + ' to bucket ' + bucketKey)
  console.log('Values in bucket ' + bucketValue + ' is now ' + bucket.values.join(', '))
}

Server.prototype.checkForExpiredBuckets = function() {
  var expired = this.bucketManager.getExpired()

  if(expired.length > 0) {
    console.log('The following buckets are expired: ' + expired.map(function(bucket) {
      return bucket.identifier
    }).join(', '))
  }
}
