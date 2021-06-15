//import delle componenti per la connessione al db
const db = require('./db');

//funzione tipo per effettuare le richieste verso il db
//in questo caso chiede la mail con la quale si sta iscrivendo l'utente per verificare se esiste nel db
async function getEmail(mail){
    //la funzione execute permette di avere un ulteriore layer di sicurezza contro gli attacchi di tipo sqlinjection
  const rows = await db.execute(\
    //query effettiva da inviare
    'SELECT Email FROM `Utente` WHERE `Email` = ?',[mail],
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        // If you execute same statement again, it will be picked from a LRU cache which will save query preparation time and give better performance
    };
    )
  return rows;
}

module.exports = {
  getEmail,
}