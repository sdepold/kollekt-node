const Bucket = require("./bucket")

var BucketManager = module.exports = function() {
  this.buckets = []
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

BucketManager.prototype.getExpired = function() {
  return this.buckets.filter(function(bucket) {
    return bucket.hasExpired()
  })
}
