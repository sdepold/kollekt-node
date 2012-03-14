const Bucket = require("./bucket")

var BucketManager = module.exports = function() {
  this.buckets = []
}

BucketManager.prototype.add = function(key) {
  var result = this.buckets.filter(function(bucket) {
    return bucket.identifier == key
  })[0]

  if(!result) {
    result = new Bucket(key)
    this.buckets.push(result)
  }

  return result
}
