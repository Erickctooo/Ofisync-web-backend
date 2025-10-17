const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "ofisync",
  password: process.env.PG_PASSWORD || "1234",
  port: process.env.PG_PORT || 5432,
});

pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch(err => console.error("❌ Error de conexión", err));

module.exports = pool;