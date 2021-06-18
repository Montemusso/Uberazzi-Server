//query varie
const path = require('path');

  exports.Homepage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname+'/build/index.html'));
  };
  

  exports.listaVeicoli = (req, res) => {
    Veicolo.findAll({
      where: {
        Prenotabile: true
      }
    })
      .then(veicolo => {
        if (!veicolo) {
          return res.status(404).send({ message: "nessun veicolo disponibile." });
        }
        tipoVeicolo = veicolo.getTipoVeicolo();
      
      res.status(200).send({
        id: Veicolo.IDVeicolo,
        tipoVeicolo: tipoVeicolo.TipoMezzo,
        numeroPosti: Veicolo.NumeroPosti,
      }
          )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.listaPrenotazioni = (req, res) => {
    Prenotazione.findAll({
      where: {
        IDUtente: req.params.IDUtente
      }
    })
      .then(prenotazione => {
        if (!prenotazione) {
          return res.status(404).send({ message: "nessuna prenotazione effettuata." });
        }
        tipoVeicolo = veicolo.getTipoVeicolo();
      
      res.status(200).send({
        id : prenotazione.IDPrenotazione,
        dataOra: prenotazione.DataOra,
        partenza: prenotazione.Partenza,
        arrivo:prenotazione.Arrivo,
        tipoVeicolo:tipoVeicolo.TipoMezzo
        }
      )})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.listaParcheggi = (req, res) => {
    Parcheggio.findAll({
      where: {
        IDParcheggio: req.params.IDParcheggio
      }
    })
      .then(parcheggio => {
        if (!parcheggio) {
          return res.status(404).send({ message: "nessuna Parcheggio disponibile." });
        }
      
      res.status(200).send({
        id:parcheggio.IDParcheggio,
        note:parcheggio.Note,
        indirizzo:parcheggio.Indirizzo,
        CAP:parcheggio.CAP,
        numeroPosti:parcheggio.NumeroPosti,
        postiOccupati:parcheggio.PostiOccupati
      })})
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.listaUtenti = (req, res) => {
    Utente.findAll()
    .then(utente => {
      if (!utente) {
        return res.status(404).send({ message: "nessun utente disponibile." });
      }
    res.status(200).send({
      id : Utente.IDUtente,
      Nome : Utente.Nome,
      Cognome : Utente.Cognome,
      DataDiNascita : Utente.DataDiNascita,
      CodiceFiscale : Utente.CodiceFiscale,
      Indirizzo : Utente.Indirizzo,
      CAP : Utente.CAP,
      NumeroPatente : Utente.NumeroPatente,
      TipoPatente : Utente.TipoPatente,
      email : Utente.Email,
      IDPermesso : Utente.IDPermesso
    }
      ) })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  };

  exports.listaCorse = (req, res) => {
    Prenotazione.findAll({
      where: {
        Autista: true,
        IDAutista: null
      }
    })
      .then(corsa => {
        if (!corsa) {
          return res.status(404).send({ message: "nessuna corsa disponibile." });
        }
        
      res.status(200).send({
        id : prenotazione.IDPrenotazione,
        dataOra: prenotazione.DataOra,
        partenza: prenotazione.Partenza,
        arrivo:prenotazione.Arrivo,
        tipoVeicolo:tipoVeicolo.TipoMezzo
      }) })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };