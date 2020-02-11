const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({
  path: require('path').join(__dirname, envFile)
});

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  },

  test: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};
