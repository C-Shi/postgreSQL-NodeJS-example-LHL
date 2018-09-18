const settings = require('./setting');

const first_name = process.argv[2] || '';
const last_name = process.argv[3] || '';
const birthdate = new Date(process.argv[4]);
const newPerson = { first_name, last_name, birthdate }

const knex = require('knex')({
  client: 'pg',
  connection: settings
});


knex.insert(newPerson)
.into('famous_people')
.returning(['first_name', 'last_name'])
.then(successHandler)
.catch(errorHandler)
.finally(knex.destroy);

function errorHandler (err) {
  if (err.hint) {
    console.log(err.hint)
  }else {
    console.log('Oh! Some Error When Trying to insert')
  }
}

function successHandler (person) {
  console.log(person);
  console.log(`successfully inserted ${person[0].first_name} ${person[0].last_name}`);
}