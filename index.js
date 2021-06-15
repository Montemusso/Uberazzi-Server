const express = require('express');
const app = express();
const port = 3000;
var path = require('path');

app.use(express.static(path.resolve(__dirname, 'build')));

//Home
//Non deve essere protetta
app.route('/home')
    .get(function (req, res, next) {
          res.sendFile(path.join(__dirname+'/build/index.html'));
    });

//Registrazione
//Non deve essere protetta

app.route('/registrazione')
    .get(function (req, res, next) {
        res.send('lista delle mail/user già usati');
        //query per verificare se l'utente è disponibile
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di invio della registrazione
      });

//Profilo
//Da proteggere e da collegare alle info del frontend

app.route('/profilo')
    .get(function (req, res, next) {
        if(req.query.user_id){
            res.send('user id: '+req.query.user_id);
            //qui ci vanno le query di get del profilo
        }
        else{
            res.send('Nessun user fornito');
        }
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di update del profilo
      });


//Prenota e prenotazioni sono da proteggere
//Prenota permette di fare la prenotazione
//Prenotazioni di vedere le prenotazioni effettuate e di modificarle
app.route('/prenota')
    .get(function (req, res, next) {
        res.send('Prenota il tuo veicolo');
        //query per verifica dei mezzi disponibili
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di invio della prenotazione
      });
    
app.route('/prenotazioni')
    .get(function (req, res, next) {
        res.send('Lista delle prenotazioni');
        //query per prendere la lista delle prenotazioni filtrato per idutente
        //la risposta la mando in json 
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di modifica della prenotazione
      });     

//Amministrazione
//Da proteggere assolutamente
app.route('/amministrazione')
    .get(function (req, res, next) {
        res.send('Lista degli utenti');
        //query per prendere tutti gli utenti registrati
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di invio della modifica dei permessi
      });

//Posteggi
//Da proteggere
app.route('/posteggi')
    .get(function (req, res, next) {
        if(req.query.idposteggio){
            res.send('Lista dei veicoli nel posteggio: '+ req.query.idposteggio);
        //query per prendere i veicoli per posteggio
    }
        else{
            res.send('indicare idposteggio per vedere i veicoli');
        }
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di invio della gestione veicoli
      });

//Corse divise per città
//Da proteggere
app.route('/corse') ///corse?citta=palermo
    .get(function (req, res, next) {
        if(req.query.citta){
            res.send('Lista delle corse per città: '+ req.query.citta);
        //query per prendere le corse per città
    }
        else{
            res.send('indicare citta per vedere le corse');
        }
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di invio della gestione corse
      });


//Upload di media
//Da proteggere
app.route('/media') ///media
    .get(function (req, res, next) {
        if(req.query.citta){
            res.send('inserire idveicolo: '+ req.query.idveicolo);
        //query per prendere le foro per idveicolo
    }
        else{
            res.send('indicare idveicolo');
        }
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di upload delle foto nel db e nella cartella public
      });


//handle 404
app.use(function(req, res, next) {
    res.status(404);
  
    // risposta con html
    if (req.accepts('html')) {
      res.send('404, pagina non trovata');
      return;
    }
  
    // risposta con json
    if (req.accepts('json')) {
      res.json({ error: '404, pagina non trovata' });
      return;
    }
  
    // default con txt
    res.type('txt').send('404, pagina non trovata');
  });  


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })