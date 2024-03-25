const Pool = require("pg").Pool;

const pool = new Pool({
  user: "database", //SQL, Postgres...
  host: "localhost",
  database: "database_name",
  password: "database_password",
  port: 5432,
});

pool.connect();

module.exports = pool;
