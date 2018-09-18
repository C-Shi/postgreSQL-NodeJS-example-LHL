const firstName = process.argv[2] || '';
const lastName = process.argv[3] || '';

const settings = require('./setting');
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const selectClause = ['first_name', 'last_name', 'birthdate'];
const whereClause = {
  first_name: firstName,
  last_name: lastName
}

knex.select(selectClause).from('famous_people')
.where({ first_name : whereClause.first_name })
.orWhere({ last_name : whereClause.last_name })
.then((rows) => {
  if (rows.length){
    lookup_handler(rows);
  }else{
    notFound_handler();
  }
}).catch(function(error) {
  console.log('error!!', error.hint)
}).finally(knex.destroy);


function lookup_handler (result){

  console.log(`Found ${result.length} person(s) by the name ${firstName} ${lastName}`);
  result.forEach((person, index) => {
    console.log(`- ${index + 1}:  ${person.first_name} ${person.last_name} born ${new Date(person.birthdate).toLocaleDateString()}`);
  });
}

function notFound_handler (){
  console.log('No Such Person In DB')
}