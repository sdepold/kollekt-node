if(typeof require === 'function') {
  const buster = require("buster")
      , Server = require("../src/server")
}

buster.spec.expose()

var initServerEnvironment = function() {
  var self = this

  this.socket = {
    on: function(){},
    bind: function(){},
  }

  this.socketLib = {
    createSocket: function() { return self.socket }
  }

  this.socketLibMock = this.mock(this.socketLib)
  this.socketMock    = this.mock(this.socket)
  this.server        = new Server({ socketLib: this.socketLib })
}

describe('Server', function() {
  describe('init', function() {
    before(function() {
      this.socketLib = {
        createSocket: function() {}
      }
      this.socketLibMock = this.mock(this.socketLib)
    })

    it('stores the passed port', function() {
      var server = new Server({ port: 2222, socketLib: this.socketLib })
      expect(server.options.port).toEqual(2222)
    })

    it('uses a default port if it is not passed', function() {
      var server = new Server({ socketLib: this.socketLib })
      expect(server.options.port).toEqual(2323)
    })
  })

  describe('start', function() {
    before(function() {
      initServerEnvironment.call(this)
    })

    it('binds a socket', function() {
      this.socketMock.expects('on').withArgs('listening').once()
      this.socketMock.expects('on').withArgs('message').once()
      this.socketMock.expects('bind').withArgs(2323).once()

      this.server.start()

      this.socketMock.verify()
      assert(true)
    })
  })

  describe('handleRequest', function() {
    before(function() {
      initServerEnvironment.call(this)
      this.serverMock = this.mock(this.server)
    })

    it("checks for expired buckets before requesting them", function() {
      this.serverMock.expects('checkForExpiredBuckets')
      this.serverMock.expects('requestBucket')
      this.server.handleRequest('foo;bar')
      this.serverMock.verify()

      assert(true)
    })
  })
})
