const { Op } = require("sequelize");
const path = require('path');
const db = require("../model");

const Utente = db.Utente;
const Permesso = db.Permesso;
const Pagamento = db.Pagamento;
const Parcheggio = db.Parcheggio;
const Prenotazione = db.Prenotazione;
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
      .then(corse => {
        if (!corse) {
          return res.status(404).send({ message: "nessuna corsa disponibile." });
        }
  
      res.status(200).send({
        corse
      }
          )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  //inserire id autista in prenotazione con id fornito
  exports.AccettaCorsa = (req, res) => {
    Prenotazione.update({
      IDAutista:req.headers["idutente"]
    },{
      where:{
        IDPrenotazione: req.query.IDPrenotazione
      },
      returning: true,
      plain: true
    }).then(prenotazione =>{
      console.log(prenotazione)
    })
      .then(    
      res.status(200).send({ message:"corsa accetttata" })
      )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.ultime_notifiche_autista = (req, res) => {
    Prenotazione.findAll({
      where: {
        IDAutista: req.headers["idutente"],
        Stato: {[Op.ne]:"conclusa"}
      },
      order:[['DataOra', 'DESC']],
      include:[{
        model: NotificheRitardo
      }],
    })
      .then(ultime_notifiche => {
        if (!ultime_notifiche) {
          return res.status(404).send({ message: "nessuna notifica." });
        }    
      res.status(200).send(
        ultime_notifiche
      )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };