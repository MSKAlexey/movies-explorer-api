require('dotenv').config();

const { NODE_ENV, JWT_SECRET, DB_HOST } = process.env;

const DEV_DB_HOST = 'mongodb://localhost:27017/bitfilmsdb';

const DEV_SECRET = '2aff12ed0d1655cfe770d9921eb907a760b9af3486e0181177d5b0592b997173';

const DB_URL = NODE_ENV === 'production' && DB_HOST ?
  DB_HOST : DEV_DB_HOST;


const JWT = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  JWT,
  DB_URL,
};
