const _    = require("underscore")
    , path = require("path")

var BucketLogger = module.exports = function(options) {
  this.options = _.extend({
    rotationTime: 1000 * 60 * 60
  }, options || {})
}

BucketLogger.prototype.log = function(bucket) {
  if(!this.fileExists()) {
    this.createFile()
  }
}

BucketLogger.prototype.fileExists = function() {


  console.log(file)
}

BucketLogger.prototype.getFilePath = function() {
  var now                = new Date()
  var dateForCurrentHour = new Date(
    now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0
  )

  return path.resolve(__dirname, '..', 'logs') + '/' + (+dateForCurrentHour) + '.log'
}

BucketLogger.prototype.createFile = function() {

}
