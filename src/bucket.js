const _ = require("underscore")

var Bucket = module.exports = function(identifier) {
  this.identifier = identifier
  this.updatedAt  = new Date()
  this.createdAt  = this.updatedAt
  this.values     = []
  this.ttl        = 1800000 // 1000 * 60 * 30 = 30 minutes
  this.idleTTL    = 30000   // 1000 * 30 = 30 seconds
  this.maxValues  = 100
}

Bucket.prototype.track = function(value) {
  this.values.push(value)
  this.updatedAt = new Date()
}

Bucket.prototype.hasExpired = function() {
  return this.isIdle() || this.isOverTTL() || this.hasTooManyValues()
}

Bucket.prototype.isIdle = function() {
  return (new Date() - this.updatedAt) >= this.idleTTL
}

Bucket.prototype.isOverTTL = function() {
  return (new Date() - this.createdAt) >= this.ttl
}

Bucket.prototype.hasTooManyValues = function() {
  return this.values.length >= this.maxValues
}

Bucket.prototype.toString = function() {
  return _.flatten([ +new Date(), this.identifier, this.values ]).join(';')
}
