var Bucket = module.exports = function(identifier) {
  this.identifier = identifier
  this.updatedAt  = new Date()
  this.values     = []
}

Bucket.prototype.track = function(value) {
  this.values.push(value)
}
