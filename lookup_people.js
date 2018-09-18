const { Client } = require('pg');
const settings = require('./setting');

const client = new Client(settings);
const firstName = process.argv[2] || '';
const lastName = process.argv[3] || '';


client.connect((err) => {
  if (err){
    return console.error ('Connection Error', err);
  };

  const q = `SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1 OR last_name = $2`

  client.query(q, [firstName, lastName], lookup_handler);
  
})

function lookup_handler (err, result){
  if (err){
    return console.error ('Error Running Query', err);
  }

  console.log(`Found ${result.rowCount} person(s) by the name ${firstName} ${lastName}`);
  result.rows.forEach((person, index) => {
    console.log(`- ${index + 1}:  ${person.first_name} ${person.last_name} born ${new Date(person.birthdate).toLocaleDateString()}`);
  })
  client.end();
}