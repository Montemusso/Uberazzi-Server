//import dei componenti utili alla connessione e alla configurazione della connessione verso il db

const mysql = require('mysql2/promise');
const config = require('./config');

//funzione per effettuare le query, prende come parametri sql e params
//con sql la query sql con i punti interrogativi al posto delle variabili e params come parametri della stessa
async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

//export del modulo
module.exports = {
  query
}