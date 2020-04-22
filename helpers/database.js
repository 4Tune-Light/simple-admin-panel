const mysql = require('mysql');
const config = require('../config/database.json')

const database = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

database.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = database;