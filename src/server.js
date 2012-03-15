const BucketManager = require("./bucket-manager")

var Server = module.exports = function(port) {
  this.port  = port || 2323
  this.dgram = require("dgram").createSocket("udp4")
  this.bucketManager = new BucketManager()
}

Server.prototype.start = function() {
  var self = this

  this.dgram.on("message", function(msg, rinfo) {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port)
    self.handleRequest(msg.toString())
  })

  this.dgram.on("listening", function() {
    var address = this.address()
    console.log("server listening " + address.address + ":" + address.port)
  })

  this.dgram.bind(this.port);
}

Server.prototype.stop = function() {
  this.dgram.close()
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
