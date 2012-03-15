const _    = require("underscore")
    , path = require("path")
    , fs   = require("fs")

var BucketLogger = module.exports = function() {}

BucketLogger.prototype.log = function(bucket) {
  var stream = fs.createWriteStream(this.getFilePath(), { flags: 'a' })
  stream.write(bucket.toString() + "\n")
  stream.end()
}

BucketLogger.prototype.getFilePath = function() {
  var now                = new Date()
  var dateForCurrentHour = new Date(
    now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0
  )

  return path.resolve(__dirname, '..', 'logs') + '/' + (+dateForCurrentHour) + '.log'
}
