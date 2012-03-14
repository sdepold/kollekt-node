if(typeof require === 'function') {
  const buster        = require("buster")
      , BucketManager = require("../src/bucket-manager")
}

buster.spec.expose()

describe('BucketManager', function() {
  before(function() {
    this.bucketManager = new BucketManager()
  })

  describe('add', function() {
    it("registers a new bucket", function() {
      this.bucketManager.add('key')
      expect(this.bucketManager.buckets.length).toEqual(1)
    })

    it("doesn't register a bucket twice", function() {
      this.bucketManager.add('key')
      this.bucketManager.add('key')
      expect(this.bucketManager.buckets.length).toEqual(1)
    })

    it("returns a bucket", function() {
      var buster = this.bucketManager.add('key')
      expect(buster).toBeDefined()
      expect(buster.identifier).toEqual('key')
    })
  })

  describe('hasExpired', function() {
    it("returns an empty array without buckets", function() {
      expect(this.bucketManager.getExpired()).toEqual([])
    })

    it("returns an empty array without expired buckets", function() {
      this.bucketManager.add('key')
      expect(this.bucketManager.getExpired()).toEqual([])
    })

    it("returns expired buckets", function() {
      var bucket1 = this.bucketManager.add('key')
        , bucket2 = this.bucketManager.add('foo')

      bucket1.updatedAt = new Date(bucket1.updatedAt - bucket1.ttl * 2)

      expect(this.bucketManager.getExpired()).toEqual([bucket1])
    })
  })
})
