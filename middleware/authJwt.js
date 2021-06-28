const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const Utente = db.Utente;
const Permesso = db.Permesso;

//funzione genera token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  //errore in caso di token assente
  if (!token) {
    console.log("Inviato stato 403, token non fornito");
    return res.status(403).send({
      message: "Nessun token fornito!"
    });
  }
  //verifica validità del token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("Inviato stato 401, Non autorizzato");

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
      IDUtente: req.headers["idutente"]
    },
    include:Permesso,
  }
    )
    .then(utente => {
    if (utente.Permesso.DettaglioPermesso=== "Amministratore") {
      console.log("Inviato stato 200, Admin autorizzato");

      res.status(200).send({
        message: "Autorizzato!"
      });
      next();
      return;
    }
    console.log("Inviato stato 403, bisogna essere admin");
      res.status(403).send({
       message: "Bisogna essere amministratori!"
      });
      return;
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  };

isAutista = (req, res, next) => {
  Utente.findOne({
    where: {
      IDUtente: req.headers["idutente"]
    },
    include:Permesso,
  }
    )
    .then(utente => {
    if (utente.Permesso.DettaglioPermesso=== "Autista") {
      console.log("Inviato stato 200, autista autorizzato");
      res.status(200).send({
        message: "Autorizzato!"
      });
      next();
      return;
    }
    console.log("Inviato stato 403, bisogna essere autisti");
      res.status(403).send({
       message: "Bisogna essere autisti!"
      });
      return;
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

isAddettoParcheggio = (req, res, next) => {
  Utente.findOne({
    where: {
      IDUtente: req.headers["idutente"]
    },
    include:Permesso,
  }
    )
    .then(utente => {
    if (utente.Permesso.DettaglioPermesso=== "AddettoParcheggio") {
      console.log("Inviato stato 200, addetto parcheggio autorizzato");
      res.status(200).send({
        message: "Autorizzato!"
      });
      next();
      return;
    }
    console.log("Inviato stato 403, bisogna essere addetti al parcheggio");
      res.status(403).send({
       message: "Bisogna essere un addetto al parcheggio!"
      });
      return;
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
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