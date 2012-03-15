const _ = require("underscore")

var Bucket = module.exports = function(identifier) {
  this.identifier = identifier
  this.updatedAt  = new Date()
  this.values     = []
  this.ttl        = 1000 * 60 * 30 // 30 minutes
}

Bucket.prototype.track = function(value) {
  this.values.push(value)
  this.updatedAt = new Date()
}

Bucket.prototype.hasExpired = function() {
  return (new Date() - this.updatedAt) > this.ttl
}

Bucket.prototype.toString = function() {
  return _.flatten([ +new Date(), this.identifier, this.values ]).join(';')
}
