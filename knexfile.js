const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({
	path: './.env'
});

const migrations = {
	directory: './db/migrations'
};

module.exports = {
	development: {
		client: 'postgresql',
		connection: process.env.DATABASE_URL,
		migrations
	},

	test: {
		client: 'postgresql',
		connection: process.env.DATABASE_URL,
		migrations
	},

	production: {
		client: 'postgresql',
		connection: process.env.DATABASE_URL,
		migrations
	}
};
