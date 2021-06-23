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
  Utente.findOne({
    where: {
      IDUtente: req.params.IDUtente
    },
    include:Permessi,
  }
    )
    .then(utente => {
    if (utente.Permessi.DettaglioPermesso=== "Amministratore") {
      res.status(200).send({
        message: "Autorizzato!"
      });
      next();
      return;
    }
      res.status(403).send({
       message: "Bisogna essere amministratori!"
      });
      return;
    });
  };

isAutista = (req, res, next) => {
  Utente.findOne({
    where: {
      IDUtente: req.params.IDUtente
    },
    include:Permessi,
  }
    )
    .then(utente => {
    if (utente.Permessi.DettaglioPermesso=== "Autista") {
      res.status(200).send({
        message: "Autorizzato!"
      });
      next();
      return;
    }
      res.status(403).send({
       message: "Bisogna essere autisti!"
      });
      return;
    });
};

isAddettoParcheggio = (req, res, next) => {
  Utente.findOne({
    where: {
      IDUtente: req.params.IDUtente
    },
    include:Permessi,
  }
    )
    .then(utente => {
    if (utente.Permessi.DettaglioPermesso=== "AddettoParcheggio") {
      res.status(200).send({
        message: "Autorizzato!"
      });
      next();
      return;
    }
      res.status(403).send({
       message: "Bisogna essere un addetto al parcheggio!"
      });
      return;
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