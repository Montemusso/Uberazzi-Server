const { Op } = require("sequelize");
const path = require('path');
const db = require("../model");

const Utente = db.Utente;
const Permesso = db.Permesso;
const Pagamento = db.Pagamento;
const Parcheggio = db.Parcheggio;
const Prenotazione = db.Prenotazione;
const TipoVeicolo = db.TipoVeicolo;
const Veicolo = db.Veicolo;
const Immagine = db.Immagine;
const NotificheRitardo = db.NotificheRitardo;


//req.query per get
//req.body per post
//req.params per roba con parametri nell'url

//Corse
//Prendere tutte le prenotazioni con flag autista vero e che non abbiano idautista
exports.corse = (req, res) => {
    Prenotazione.findAll({
      where: {
        Autista: true,
        IDAutista:null
      },
      include:[{
        model: Veicolo
      }]
    })
      .then(prenotazione => {
        if (!prenotazione) {
          return res.status(404).send({ message: "nessuna corsa disponibile." });
        }
  
      res.status(200).send({
        prenotazione
      }
          )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  //inserire id autista in prenotazione con id fornito