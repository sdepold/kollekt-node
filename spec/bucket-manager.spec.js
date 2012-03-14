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
})
