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

//Permessi utenti
//selezionare tutti gli utenti 
exports.utenti = (req, res) => {
    Utenti.findAll()
      .then(utenti => {
        if (!utenti) {
          return res.status(404).send({ message: "nessun utente disponibile." });
        }
  
      res.status(200).send({
        utenti
      }
          )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  //aggiornare i permessi dell'utente
  
  //Gestione prenotazioni
  //Selezionare tutte le prenotazioni attive non complete
  exports.prenotazioni_attive = (req, res) => {
    Prenotazione.findAll({
      where: {
        IDUtente: req.query.IDUtente,
        Stato: {[Op.ne]:"completata"}
      },
      order:[['DataOra', 'DESC']],
      include:[{
        model: Veicolo
      },{
        model: TipoVeicolo
      }]
    })
      .then(prenotazione => {
        if (!prenotazione) {
          return res.status(404).send({ message: "nessuna prenotazione effettuata." });
        }    
      res.status(200).send(
        prenotazione
      )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.aggiorna_permesso = (req, res) => {
    Utente.Update({
      Permesso:req.body.Permesso
    },{
      where: {
        IDUtente:req.query.IDUtente
      }
    })
      .then(
        res.status(200).send({ message: "permesso aggiornato" })
        )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };