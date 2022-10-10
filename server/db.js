const Pool = require("pg").Pool;
require("dotenv").config();
var environment = process.env.NODE_ENV || "development";
let pool;
if (environment === "development") {
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "root",
    database: "zenbit_test",
  });
} else {
  pool = new Pool({
    user: "dlfnaxqabmcscj",
    host: "ec2-34-247-72-29.eu-west-1.compute.amazonaws.com",
    port: 5432,
    password:
      "abfdc1f5052ec74999d5cc1a98ebd4cc95bcfbfcc4b7fac0503dab8f57bdfeed",
    database: "dnptmqf0ct36l",
    dialect: "postgres",
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

module.exports = pool;
