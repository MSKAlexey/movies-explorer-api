require('dotenv').config();

// забираем нужные переменные из .env
// в случае если файла .env нет или их там нет
// то все они будут undefined
/* const {
 NODE_ENV, JWT_SECRET, DB_HOST, PORT,
 SECRET } = process.env; */
const { NODE_ENV, JWT_SECRET } = process.env;

// задаем переменные с дефолтными (dev) значениями
/*
const DEV_SECRET = 'SECRETSECRETSECRET';
const DEV_DB_HOST = 'mongodb://localhost:27017/mydatabase';
const DEV_PORT = 3000;
*/
const DEV_SECRET = '2aff12ed0d1655cfe770d9921eb907a760b9af3486e0181177d5b0592b997173';

// далее задаем переменные которые уже пойдут наружу

// если NODE_ENV === 'production' и DB_HOST существует (из .env)
// то используем DB_HOST, если нет — используем DEV_DB_HOST
// и так далее

/*
const DB = NODE_ENV === 'production' && DB_HOST ?
 DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === 'production' &&
 PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production' &&
 SECRET ? SECRET : DEV_SECRET;
 */

const JWT = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

// выдаем наружу то что требуется
/*
module.exports = {
 DB,
 SERVER_PORT,
 SECRET_STRING
}
*/
module.exports = {
  JWT,
};
