if(typeof require === 'function') {
  var buster = require("buster")
}

// buster.spec.expose()

buster.testCase('asd', {
  'asd': function() {
    assert(false)
  }
})

// describe('Bucket', function() {
//   describe('init', function() {
//     it("stores the passed identifier", function() {
//       //var bucker = new Bucket('foo')
//       //expect(bucket.identifier).toEqual('foo')
//       assert(false)
//     })
//   })
// })
