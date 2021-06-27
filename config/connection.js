
const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'WorkDB',
  password: 'PASSWORD',
  port: 5432,
  dialect:'postgres'
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected With Pg Admin");
});