//import moduli
const express = require('express');
const app = express();
//https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
//oggetto per le query al db
const dbquery = require ('./query.js');
//oggetto per l'upload dei file e relativa configurazione
//https://www.npmjs.com/package/multer
var multer  = require('multer');
//cors
const cors = require("cors"); //https://www.npmjs.com/package/cors
//Utile per creare il body delle req
const bodyParser = require("body-parser");

//import modelli
const db = require("./model");
const Permesso = db.Permesso;
//configurazione dei moduli e delle variabili di ambiente

//Cofig iniziale del db
//ATTENZIONE, SOLO PER VERSIONE DI SVILUPPO
//IN VERSIONE DI RILASCIO BISOGNERÀ TOGLIERE IL FORCE TRUE E LA CHIAMATA A INITIAL
//db.sequelize.sync(); è l'unica funzione che ci serve dopo

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Permesso.create({
    DettagioPermesso: "Utente"
  });
 
  Permesso.create({
    DettagioPermesso: "Autista"
  });
 
  Permesso.create({
    DettagioPermesso: "AddettoParcheggio"
  });
  Permesso.create({
    DettagioPermesso: "Amministratore"
  });

}

//Configurazione per la porta del server
const port = process.env.PORT;

//configurazione per la posizione ed il nome del file
var storage = multer.diskStorage({
  destination: "./Public/upload",
  filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
  }
  })
var upload = multer({ storage: storage }).array('file');

var corsOptions = {
  origin: "http://localhost"
};
app.use(cors(corsOptions));

//bodyparser per contenuto di tipo application/json
app.use(bodyParser.json());
// bodyparser per contenuto di tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));











//aggiunta delle rotte degli elementi statici all'app
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, '/Public/upload')));

//Router 
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
        res.json(await dbquery.getEmail(req.query.email));
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
        res.json('Prenota il tuo veicolo');
        //query per verifica dei mezzi disponibili
      })
    .post(function (req, res, next) {
        // qui ci vanno le query di invio della prenotazione
      });
    
app.route('/prenotazioni')
    .get(function (req, res, next) {
        res.json('Lista delle prenotazioni');
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
        res.json('Lista degli utenti');
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
            res.json('Lista dei veicoli nel posteggio: '+ req.query.idposteggio);
        //query per prendere i veicoli per posteggio
    }
        else{
            res.json('indicare idposteggio per vedere i veicoli');
        }
      })
    .post(function (req, res, next) {
      if(req.query.idveicolo){
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              return res.status(500).json(err)
            }
          else if (err) {
              return res.status(500).json(err)
            }
        return res.status(200).send(req.file)
        //query per aggiugnere il nome della foto, il path e veicolo nel db
        //il nome del file si trova in req.file.filename
        //il path invece in req.file.path
          })
      }
      else{
        res.json('indicare idveicolo per inviare le foto');
      };
    });

//Corse divise per città
//Da proteggere
app.route('/corse') ///corse?citta=palermo
    .get(function (req, res, next) {
        if(req.query.citta){
            res.json('Lista delle corse per città: '+ req.query.citta);
        //query per prendere le corse per città
    }
        else{
            res.json('indicare citta per vedere le corse');
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
            res.json('inserire idveicolo: '+ req.query.idveicolo);
        //query per prendere le foro per idveicolo
    }
        else{
            res.json('indicare idveicolo');
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
  });