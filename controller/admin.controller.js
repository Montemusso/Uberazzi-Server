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

//Permessi utenti
//selezionare tutti gli utenti 
exports.RichiestaUtenti = (req, res) => {
  Utente.findAll()
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
  exports.RichiediDati = (req, res) => {
    Prenotazione.findAll({
      where: {
        Stato: {[Op.ne]:"conclusa"}
      },
      order:[['DataOra', 'DESC']],
      include:[{
        model: Veicolo
      }]
    })
      .then(prenotazioni_attive => {
        if (!prenotazioni_attive) {
          return res.status(404).send({ message: "nessuna prenotazione effettuata." });
        }    
      res.status(200).send(
        prenotazioni_attive
      )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.ModificaPermessi = (req, res) => {
    Utente.update({
      IDPermesso:req.query.Permesso
    },{
      where: {
        IDUtente:req.query.IDUtente
      },
      returning: true,
      plain: true
    })
      .then(update =>{
        console.log(update)
      })
      .then(
        res.status(200).send({ message: "permesso aggiornato" })
        )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.nuovo_veicolo = (req, res) => {
    Veicolo.create({
      TipoVeicolo: req.body.TipoVeicolo,
      Condizioni:"Nessun Problema",
      Prenotabile:true,
      NumeroPosti:req.body.NumeroPosti,
      Prezzo:req.body.Prezzo,
      Targa:req.body.Targa,
      IDParcheggio: req.body.Parcheggio,
      Nome: req.body.Nome
    })
    .then( res.status(200).send({ message:"Veicolo aggiunto" }))
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  