var dgram    = require('dgram')
  , bytes    = 0
  , mcount   = 0
  , date     = null
  , debugged = {}

sock = dgram.createSocket("udp4", function (msg, rinfo) {
  date   = new Date
  bytes  += msg.length
  mcount += 1

  if((+date % 1000) == 0) {
    var dateWithoutMS = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0)

    if(!debugged[dateWithoutMS]) {
      debugged[dateWithoutMS] = true

      console.log("Mb/s:", (bytes * 8) / 1024 / 1024, ", m/s: ", mcount)
      bytes = 0
      mcount = 0
    }
  }
})

sock.bind(2323, '0.0.0.0')
