const dotenv=require("dotenv");
dotenv.config();
module.exports={
  "development": {
    "username": process.env.MY_SQL_USERNAME,
    "password": process.env.MY_SQL_PASSWORD,
    "database": process.env.MY_SQL_DB_NAME,
    "host": process.env.MY_SQL_HOST,
    "dialect": "mysql",
    // "logging":false,
    "dialectOptions": {
      bigNumberStrings: true
    }
  },
  "test": {
    "username": process.env.MY_SQL_USERNAME,
    "password": process.env.MY_SQL_PASSWORD,
    "database": process.env.MY_SQL_DB_NAME,
    "host": process.env.MY_SQL_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MY_SQL_USERNAME,
    "password": process.env.MY_SQL_PASSWORD,
    "database": process.env.MY_SQL_DB_NAME,
    "host": process.env.MY_SQL_HOST,
    "dialect": "mysql"
  }
}
