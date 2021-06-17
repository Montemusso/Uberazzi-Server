const db = require("../model");
const Immagine = db.Immagine;

exports.uploadPhoto = (req, res) => {
    // Crea utente nel database
    Immagine.create({
      Filename: req.body.Nome,
      Path: req.body.Cognome,
      IDVeicolo: req.body.DataDiNascita,
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };