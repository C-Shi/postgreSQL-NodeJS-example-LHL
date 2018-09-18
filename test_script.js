const { Client } = require('pg');
const settings = require('./setting');

const client = new Client(settings)


client.connect((err) => {
  if (err){
    return console.error ('Connection Error', err);
  };

  client.query('SELECT $1::int AS number', ['1'], (err, result) => {
    if (err){
      return console.error ('Error Running Query', err);
    }
    console.log(result);
    console.log(result.rows[0].number);
    client.end();
  })
})