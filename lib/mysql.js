const config = require('../config')

const connections = require('mysql').createPool(config.mysql)

module.exports = connections
