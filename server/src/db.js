const { Pool } = require('pg');
const dotenv = require("dotenv").config({path:"./src/.env"});

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        require: true,
      },
  });

  module.exports=pool;