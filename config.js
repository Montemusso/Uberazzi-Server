const env = process.env;
const dotenv = require('dotenv');
dotenv.config();

//Configurazione del database per non dover richiamare sempre i dati e mantenere pulito il codice
const config = {
  db: { 
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
};

//export del modulo config per renderlo disponibile agli altri moduli js
module.exports = config;