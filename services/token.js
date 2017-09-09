'use strict'

const jwt = require('jwt-simple')

// var token = jwt.sign({ foo: 'bar' }, 'shhhhh')
// // backdate a jwt 30 seconds
// var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh')
//
// // sign with RSA SHA256
// var cert = fs.readFileSync('private.key')  // get private key
// var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'})
//
// // sign asynchronously
// jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function (err, token) {
//   console.log(token)
// })

module.exports = {
  retieve: function (token) {
    var user = jwt.decode(token, 'secret')
    return user
  },
  generate: function (user) {
    var token = jwt.encode(user, 'secret')
    return token
  }
}
