const db = require("../model");
const config = require("../config/auth.config");
const Utente = db.Utente;
const Ruoli = db.Ruoli;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Da sistemare get e set in base a come impostare il sistema for ex.(Ruoli or Permesso)
//Verificare scrittura di Utente e Ruoli

//Funzione di registrazione che crea nella tabella utente un record che rappresenta l'utente tramite i campi del form di registrazione
exports.signup = (req, res) => {
  // Crea utente nel database
  Utente.create({
    Nome: req.body.Nome,
    Cognome: req.body.Cognome,
    DataDiNascita: req.body.DataDiNascita,
    CodiceFiscale: req.body.CodiceFiscale,
    Indirizzo: req.body.Indirizzo,
    CAP: req.body.CAP,
    Email: req.body.Email,
    password: bcrypt.hashSync(req.body.password, 8),
    NumeroPatente: req.body.NumeroPatente,
    TipoPatente: req.body.TipoPatente,
    IDPermesso: 0
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//Funzione di login con ricerca per campo Email per verificare univocità
exports.signin = (req, res) => {
  Utente.findOne({
    where: {
      Email: req.body.Email
    }
  })
    //check dell'esistenza di un profilo Utente
    .then(Utente => {
      if (!Utente) {
        return res.status(404).send({ message: "Utente non trovato." });
      }
      //Assegna ad una variabile il risultato del confronto con la password criptata generata tramite la funziona hash
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        Utente.password
      );
      //Gestisce l'errore in caso di match negativo della password
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Password sbagliata!"
        });
      }
      //crea token di login
      var token = jwt.sign({ id: Utente.IDUtente }, config.secret, {
        expiresIn: 86400 // 24 ore
      });
      res.status(200).send({
        id: Utente.IDUtente,
        Nome: Utente.Nome,
        Cognome: Utente.Cognome,
        DataDiNascita: Utente.DataDiNascita,
        CodiceFiscale: Utente.CodiceFiscale,
        Indirizzo: Utente.Indirizzo,
        CAP: Utente.CAP,
        NumeroPatente: Utente.NumeroPatente,
        TipoPatente: Utente.TipoPatente,
        email: Utente.Email,
        IDPermesso: Utente.IDPermesso,
        accessToken: token
      });
    })
    //catch di errore generico tipo 500
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};