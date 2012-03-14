if(typeof require === 'function') {
  const buster = require("buster")
      , Bucket = require("../src/bucket")
}

buster.spec.expose()

describe('Bucket', function() {
  describe('init', function() {
    it("stores the passed identifier", function() {
      var bucket = new Bucket('foo')
      expect(bucket.identifier).toEqual('foo')
    })

    it("sets date of last update to current timestamp", function() {
      var bucket = new Bucket()
      expect(parseInt(bucket.updatedAt / 1000)).toEqual(parseInt(new Date() / 1000))
    })
  })

  describe("track", function() {
    before(function() {
      this.bucket = new Bucket('foo')
    })

    it("stores the passed value", function() {
      this.bucket.track('a value')
      expect(this.bucket.values.length).toEqual(1)
    })
  })

  describe('hasExpired', function() {
    before(function() {
      this.bucket = new Bucket('foo')
    })

    it("is false for freshly created buckets", function() {
      expect(this.bucket.hasExpired()).toBeFalse()
    })

    it("is false for just tracked buckets", function() {
      this.bucket.track('asd')
      expect(this.bucket.hasExpired()).toBeFalse()
    })

    it("is true for tracks that are older than ttl", function() {
      this.bucket.updatedAt = new Date(this.bucket.updatedAt - this.bucket.ttl * 2)
      expect(this.bucket.hasExpired()).toBeTrue()
    })
  })

})
