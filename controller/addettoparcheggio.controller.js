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
      .then(prenotazione => {
        if (!prenotazione) {
          return res.status(404).send({ message: "nessun veicolo disponibile." });
        }
  
      res.status(200).send(
        prenotazione
        )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  //query per aggiornare lo stato dei veicoli 

  
//Ritiro veicoli
//Selezionare i veicoli ritirabili dal cliente, prendo idVeicolo dalle prenotazioni attive e con il 
//flag consegnato a 1 così so che per quelle prenotazioni devo ritirare;
//Aggiornare prenotazione con stato "in corso"




//Veicoli
//selezionare i veicoli di cui verificare le condizioni, prendnendo gli id delle prenotazioni con stato non concluso da scrivere in raw sql
//aggiorna tabella prenotazioni con lo stato in corso
