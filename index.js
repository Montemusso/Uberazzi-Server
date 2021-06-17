//import moduli
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
//https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
//oggetto per le query al db
const dbquery = require ('./query.js');
//cors
const cors = require("cors"); //https://www.npmjs.com/package/cors
//Utile per creare il body delle req
const bodyParser = require("body-parser");

const addToDb = require("./controller/upload.photo");

let ts = Date.now();

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

app.use(fileUpload());

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

//Rotte
require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);


app.post('/api/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + './Public/upload/' + ts +sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    addToDb(sampleFile.name, uploadPath, req.query.IDVeicolo);
    res.send('File uploaded!');
  });
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