const config = require('../config')

const mysql = require('mysql')
const pool = mysql.createPool(config.mysql)
const _ = require('lodash')

var runner = function (q, data, callback) {
  if (callback) {
    _.each(data, function (v, k) {
      if (typeof v === 'string') {
        v = '"' + v + '"'
      }
      q = q.replace(new RegExp('\\$' + k, 'g'), v)
    })
    data = callback
  }
  pool.getConnection(function (err, conn) {
    if (err) {
      return data(err)
    }
    conn.query(q, function (error, results, fields) {
      conn.release()
      data(error, results)
    })
  })
}

module.exports = {
  query: runner
}
