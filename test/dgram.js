var dgram = require('dgram')
  ;


sock = dgram.createSocket("udp4", function (msg, rinfo) {
});

sock.bind(8000, '0.0.0.0');
