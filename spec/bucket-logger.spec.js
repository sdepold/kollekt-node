if(typeof require === 'function') {
  const buster       = require("buster")
      , BucketLogger = require("../src/bucket-logger")
}

buster.spec.expose()

describe('BucketLogger', function() {
  describe('init', function() {
    it('stores the passed rotation time', function() {
      var logger = new BucketLogger({
        rotationTime: 1000 * 60 // 1min
      })
      expect(logger.options.rotationTime).toEqual(60000)
    })

    it('has a default rotation time', function() {
      var logger = new BucketLogger()
      expect(logger.options.rotationTime).toBeDefined()
    })
  })

  describe('log', function() {
    before(function() {
      this.logger = new BucketLogger()
    })

    it('creates a logfile for the current hour if none exist', function() {
      this.stub(this.logger, 'fileExists').returns(false)

      var loggerMock = this.mock(this.logger)
      loggerMock.expects('createFile').once()

      this.logger.log({})

      loggerMock.verify()
      assert(true)
    })

    it("doesn't create a logfile for the current hour if one already exist", function() {
      this.stub(this.logger, 'fileExists').returns(true)

      var loggerMock = this.mock(this.logger)
      loggerMock.expects('createFile').never()

      this.logger.log({})

      loggerMock.verify()
      assert(true)
    })
  })

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

  /*describe('fileExists', function() {
    before(function() {
      this.clock  = this.useFakeTimers()
      this.logger = new BucketLogger()
    })

    after(function() {
      this.clock.restore()
    })

    it("creates a new file for each hour", function() {
      expect(this.logger.fileExists()).toBeFalse()

      this.logger.

      this.logger.log({})

      loggerMock.verify()
      assert(true)
    })
  })*/
})
