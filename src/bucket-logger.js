const _    = require("underscore")
    , path = require("path")
    , fs   = require("fs")

var BucketLogger = module.exports = function() {
  this.streams = {}
}

BucketLogger.prototype.log = function(bucket) {
  var filePath = this.getFilePath()
    , self     = this

  if(!this.streams[filePath]) {
    self.streams[filePath] = fs.createWriteStream(filePath, { flags: 'a' })
    self.closeOldStreams
  }

  this.streams[filePath].write(bucket.toString() + "\n")
}

BucketLogger.prototype.closeOldStreams = function() {
  var filePath = this.getFilePath()

  _.each(this.streams, function(stream, key) {
    if(key != filePath) {
      stream.close()
    }
  })
}

BucketLogger.prototype.getFilePath = function() {
  var now                = new Date()
  var dateForCurrentHour = new Date(
    now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0
  )

  return path.resolve(__dirname, '..', 'logs') + '/' + (+dateForCurrentHour) + '.log'
}
