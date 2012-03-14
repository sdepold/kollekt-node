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
      expect(bucket.updatedAt / 1000).toEqual(new Date() / 1000)
    })
  })

})
