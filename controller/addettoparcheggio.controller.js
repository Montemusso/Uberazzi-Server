//query varie
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

//consegna veicoli addetto 
//lista delle prenotazioni con macchina non consegnata
exports.consegne_veicoli = (req, res) => {
    Prenotazione.findAll({
      where: {
        Consegnato: false,
        Stato:"attiva"
      },
      include:[{
        model: Veicolo
      }]
    })
      .then(consegne_veicoli => {
        if (!consegne_veicoli) {
          return res.status(404).send({ message: "nessun veicolo disponibile." });
        }
  
      res.status(200).send(
        consegne_veicoli
        )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  //query per aggiornare lo stato dei veicoli 

  exports.aggiorna_stato_veicolo = (req, res) => {
    Veicolo.Update({
      Stato:req.body.Stato
    },{
      where: {
        IDVeicolo:req.query.IDVeicolo
      }
    })
      .then(
        res.status(200).send({ message: "Veicolo aggiornato" })
        )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.aggiorna_stato_prenotazione = (req, res) => {
    Prenotazione.Update({
      Stato:req.body.Stato
    },{
      where: {
        IDPrenotazione:req.query.IDPrenotazione
      }
    })
      .then(
        res.status(200).send({ message: "Prenotazione aggiornata" })
        )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.veicoli_ritirabili = (req, res) => {
    Prenotazione.findAll({
      where: {
        Stato: "conclusa",
        Consegnato: true,
      },
      include:[{
        model: Veicolo
      }]
    })
      .then(veicoli_ritirabili => {
        if (!veicoli_ritirabili) {
          return res.status(404).send({ message: "nessun veicolo disponibile." });
        }
  
      res.status(200).send(
        veicoli_ritirabili
        )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.richiediCondizioni = (req, res) => {
    Veicolo.findAll({
      where: {
        Prenotabile: false,
      }
    })
      .then(condizioni_veicoli => {
        if (!condizioni_veicoli) {
          return res.status(404).send({ message: "nessuna condizione disponibile." });
        };
      res.status(200).send(
        condizioni_veicoli
        )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };


  exports.contrassegnaDisponibile = (req, res) => {
    Veicolo.update({
      Prenotabile: 1
    },{
      where: {
        IDVeicolo:req.query.IDVeicolo
      }
    })
      .then(
        res.status(200).send({ message: "Veicolo aggiornato" })
        )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.consegna_veicolo_AddettoParcheggio = (req, res) => {
    Prenotazione.update({
        Stato: "conclusa",
        consegnato: true
    },{
      where: {
        IDPrenotazione: req.query.IDPrenotazione
      }
    })
      .then(    
      res.status(200).send({ message:"consegna effettuata" })
      )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.ritira_veicolo_AddettoParcheggio = (req, res) => {
    Prenotazione.update({
        Prenotabile: false
    },{
      where: {
        IDPrenotazione: req.query.IDPrenotazione
      }
    })
      .then(    
      res.status(200).send({ message:"veicolo ritirato" })
      )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  //query per aggiornare le condizioni dei veicoli 

  exports.aggiorna_condizioni_veicolo = (req, res) => {
    Veicolo.update({
      Condizioni:req.body.CondizioniVeicolo
    },{
      where: {
        IDVeicolo:req.query.IDVeicolo
      }
    })
      .then(
        res.status(200).send({ message: "Veicolo aggiornato" })
        )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };