const db = require("../model");
const config = require("../config/auth.config");
const Utente = db.Utente;
const Ruoli = db.Ruoli;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
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
    IDPermesso: req.body.IDPermesso,

  })//da controllare
    .then(Utente => {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Utente.findOne({
    where: {
      Email: req.body.Email
    }
  })
    .then(Utente => {
      if (!Utente) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        Utente.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: Utente.IDUtente }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(Ruoli => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + Ruoli[i].name.toUpperCase());
        }
        res.status(200).send({
          id: Utente.IDUtente,
          email: Utente.Email,
          Ruoli: Utente.IDPermesso,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};