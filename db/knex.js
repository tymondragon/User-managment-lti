const knexConfig = require('../knexfile')[process.env.NODE_ENV]
module.exports = require('knex')(knexConfig)