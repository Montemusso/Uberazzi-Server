const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const Utente = db.Utente;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Nessun token fornito!"
    });
  }

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

isAdmin = (req, res, next) => {
  Utente.findByPk(req.IDUtente).then(utente => {
    utente.getPermesso().then(permesso => {
      for (let i = 0; i < Permesso.length; i++) {
        if (Permesso[i].name === "Amministratore") {
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
        if (permesso[i].name === "Autista") {
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
        if (permesso[i].name === "Autista") {
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

isUtente = (req, res, next) => {
  Utente.findByPk(req.IDUtente).then(utente => {
    utente.getPermesso().then(permesso => {
      for (let i = 0; i < roles.length; i++) {
        if (permesso[i].name === "Utente") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Bisogna essere utenti registrati!"
      });
    });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAutista: isAutista,
  isAddettoParcheggio: isAddettoParcheggio,
  isUtente: isUtente
};

module.exports = authJwt;