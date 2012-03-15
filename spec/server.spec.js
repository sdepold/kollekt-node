if(typeof require === 'function') {
  const buster = require("buster")
      , Server = require("../src/server")
}

buster.spec.expose()

describe('Server', function() {
  describe('init', function() {
    before(function() {
      this.serverLib = {
        createSocket: function() {}
      }
    })

    it('stores the passed port', function() {
      var server = new Server({ port: 2222, serverLib: this.serverLib })
      expect(server.options.port).toEqual(2222)
    })

    it('uses a default port if it is not passed', function() {
      var serverLibMock = this.mock(this.serverLib)
      var server = new Server({ serverLib: this.serverLib })
      expect(server.options.port).toEqual(2323)
    })
  })

  // describe('start', function() {
  //   before(function() {
  //     this.server = new Server()
  //   })

  //   it('starts a server', function() {
  //     var mock = this.mock(this.server.dgram)

  //     mock.expects('on').withArgs('listening').once()
  //     mock.expects('on').withArgs('message').once()
  //     mock.expects('bind').withArgs(2323).once()

  //     this.server.start()

  //     mock.verify()
  //     assert(true)
  //     mock.restore()
  //     this.server.dgram.close()
  //   })
  // })
})
