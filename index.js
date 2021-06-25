//import moduli
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
//https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
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

app.use(fileUpload());

var corsOptions = {
  origin: "http://localhost:3000"
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
require('./routes/auth.route')(app);
require('./routes/user.route')(app);

app.listen(port, () => {
  console.log(`Uberazzi server ti ascolta al link http://localhost:${port}`)
});