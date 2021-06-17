const db = require("../model");
const Immagine = db.Immagine;

exports.uploadPhoto = (Nome, path, IDVeicolo) => {
    // Crea l'immagine nel database
    Immagine.create({
      Filename: Nome,
      Path: path,
      IDVeicolo: IDVeicolo,
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };