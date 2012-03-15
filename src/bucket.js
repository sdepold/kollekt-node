const _ = require("underscore")

var Bucket = module.exports = function(identifier) {
  this.identifier = identifier
  this.updatedAt  = new Date()
  this.createdAt  = this.updatedAt
  this.values     = []
  this.ttl        = 1000 * 60 * 30 // 30 minutes
  this.idleTTL    = 1000 * 30 // 30 seconds
}

Bucket.prototype.track = function(value) {
  this.values.push(value)
  this.updatedAt = new Date()
}

Bucket.prototype.hasExpired = function() {
  return this.isIdle() || this.isOverTTL()
}

Bucket.prototype.isIdle = function() {
  return (new Date() - this.updatedAt) > this.idleTTL
}

Bucket.prototype.isOverTTL = function() {
  return (new Date() - this.createdAt) > this.ttl
}

Bucket.prototype.toString = function() {
  return _.flatten([ +new Date(), this.identifier, this.values ]).join(';')
}
