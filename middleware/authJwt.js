const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const Utente = db.Utente;

//funzione genera token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  //errore in caso di token assente
  if (!token) {
    return res.status(403).send({
      message: "Nessun token fornito!"
    });
  }
  //verifica validità del token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Non Autorizzato!"
      });
    }
    req.IDUtente = decoded.id;
    next();
  });
};

//In queste funzioni viene caricato il permesso dell'utente e scansionato per verificare il suo ruolo
isAdmin = (req, res, next) => {
  Utente.findByPk(req.IDUtente).then(utente => {
    utente.getIDPermesso().then(permesso => {
      for (let i = 0; i < Permesso.length; i++) {
        if (Permesso[i].DettagioPermesso === "Amministratore") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Bisogna essere amministratori!"
      });
      return;
    });
  });
};

isAutista = (req, res, next) => {
  Utente.findByPk(req.IDUtente).then(utente => {
    utente.getPermesso().then(permesso => {
      for (let i = 0; i < roles.length; i++) {
        if (permesso[i].DettagioPermesso === "Autista") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Bisogna essere Autisti!"
      });
    });
  });
};

isAddettoParcheggio = (req, res, next) => {
  Utente.findByPk(req.IDUtente).then(utente => {
    utente.getPermesso().then(permesso => {
      for (let i = 0; i < roles.length; i++) {
        if (permesso[i].DettagioPermesso === "AddettoParcheggio") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Bisogna essere Addetti al parcheggio!"
      });
    });
  });
};


//variabili per gestione permessi
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAutista: isAutista,
  isAddettoParcheggio: isAddettoParcheggio
};

module.exports = authJwt;