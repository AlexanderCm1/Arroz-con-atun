const Pool = require('pg').Pool;
const {database} = require('./config/default');


const pool = new Pool(database);

console.log("database is connected")

module.exports = pool;