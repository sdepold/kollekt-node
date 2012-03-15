const Bucket = require("./bucket")
    , Logger = require("./bucket-logger")

var BucketManager = module.exports = function() {
  this.buckets = []
  this.logger  = new Logger()
}

BucketManager.prototype.add = function(key) {
  var result = this.get(key)

  if(!result) {
    result = new Bucket(key)
    this.buckets.push(result)
  }

  return result
}

BucketManager.prototype.get = function(key) {
  return this.buckets.filter(function(bucket) {
    return bucket.identifier == key
  })[0]
}

BucketManager.prototype.remove = function(key) {
  this.buckets = this.buckets.filter(function(bucket) {
    return bucket.identifier != key
  })
}

BucketManager.prototype.getExpired = function() {
  return this.buckets.filter(function(bucket) {
    return bucket.hasExpired()
  })
}

BucketManager.prototype.logExpired = function() {
  var expiredBuckets = this.getExpired()
    , self           = this

  expiredBuckets.forEach(function(bucket) {
    self.logger.log(bucket)
    self.remove(bucket.identifier)
  })
}
