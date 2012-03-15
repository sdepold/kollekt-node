if(typeof require === 'function') {
  const buster       = require("buster")
      , BucketLogger = require("../src/bucket-logger")
}

buster.spec.expose()

describe('BucketLogger', function() {
  describe('getFilePath', function() {
    before(function() {
      this.clock = this.useFakeTimers()
    })

    after(function() {
      this.clock.restore()
    })

    it('returns the same file for the whole hour', function() {
      var passedMillisecondsForHour = 1000 * 60 * 60 * 3

      this.clock.tick(passedMillisecondsForHour)

      var logger = new BucketLogger()

      expect(logger.getFilePath()).toMatch(new RegExp(".*/logs/" + passedMillisecondsForHour + ".log"))
      this.clock.tick(1)
      expect(logger.getFilePath()).toMatch(new RegExp(".*/logs/" + passedMillisecondsForHour + ".log"))
    })
  })
})
