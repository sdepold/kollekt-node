if(typeof require === 'function') {
  const buster = require("buster")
      , Bucket = require("../src/bucket")
}

buster.spec.expose()

describe('Bucket', function() {
  describe('init', function() {
    before(function() {
      this.clock  = this.useFakeTimers()
    })

    after(function() {
      this.clock.restore()
    })

    it("stores the passed identifier", function() {
      var bucket = new Bucket('foo')
      expect(bucket.identifier).toEqual('foo')
    })

    it("sets date of last update to current timestamp", function() {
      var bucket = new Bucket()
      expect(bucket.updatedAt).toEqual(new Date())
    })
  })

  describe("track", function() {
    before(function() {
      this.clock  = this.useFakeTimers()
      this.bucket = new Bucket('foo')
    })

    after(function() {
      this.clock.restore()
    })

    it("stores the passed value", function() {
      this.bucket.track('a value')
      expect(this.bucket.values.length).toEqual(1)
    })

    it("set's the updatedAt", function() {
      var before = this.bucket.updatedAt

      this.clock.tick(1000)
      this.bucket.track('foo')

      refute.equals(before, this.bucket.updatedAt)
    })
  })

  describe('hasExpired', function() {
    before(function() {
      this.clock  = this.useFakeTimers()
      this.bucket = new Bucket('foo')
      this.stub(this.bucket, 'isOverTTL').returns(false)
    })

    after(function() {
      this.clock.restore()
    })

    it("is false for freshly created buckets", function() {
      expect(this.bucket.hasExpired()).toBeFalse()
    })

    it("is false for just tracked buckets", function() {
      this.clock.tick(this.bucket.ttl - 1)
      this.bucket.track('asd')
      this.clock.tick(100)
      expect(this.bucket.hasExpired()).toBeFalse()
    })

    it("is true for tracks that are older than ttl", function() {
      this.clock.tick(this.bucket.ttl + 1)
      expect(this.bucket.hasExpired()).toBeTrue()
    })
  })

})
