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
        console.log(results); // result contiene il risultato della query
        console.log(fields); // Se ci sono, include ulteriori metadati
        };
    )
  return results;
}

module.exports = {
  getEmail,
}