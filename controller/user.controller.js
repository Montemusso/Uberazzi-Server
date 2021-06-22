//query varie
const path = require('path');

//Homepage
  exports.Homepage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname+'/build/index.html'));
  };
  
//Pagina Profilo:
//Query: ultime tre prenotazioni con ritorno id, data e stato
//aggiornare dati utente
//lista prenotazioni ritorna i dati delle ultime 3 prenotazioni effettuate
exports.ultimePrenotazioni = (req, res) => {
  Prenotazione.findAll({
    where: {
      IDUtente: req.params.IDUtente
    },
    order:[['DataOra', 'DESC']],
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
      tipoVeicolo:tipoVeicolo.TipoMezzo,
      stato: tipoVeicolo.Stato
      }
    )})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//Aggiorna dati utente:
//Da fare con post


//Pagina prenotazioni
//Selezionare tutte le prenotazioni 
exports.listaPrenotazioni = (req, res) => {
  Prenotazione.findAll({
    where: {
      IDUtente: req.params.IDUtente
    },
    order:[['DataOra', 'DESC']],
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
      tipoVeicolo:tipoVeicolo.TipoMezzo,
      stato: tipoVeicolo.Stato
      }
    )})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//modifica prenotazioni
//seleziona la prenotazione singola e ritornane i dati

exports.prenotazione = (req, res) => {
  Prenotazione.findByPk (req.params.IDPrenotazione)
    .then(prenotazione => {
      if (!prenotazione) {
        return res.status(404).send({ message: "nessuna prenotazione trovata." });
      }
      tipoVeicolo = veicolo.getTipoVeicolo();
    
    res.status(200).send({
      id : prenotazione.IDPrenotazione,
      dataOra: prenotazione.DataOra,
      partenza: prenotazione.Partenza,
      arrivo:prenotazione.Arrivo,
      tipoVeicolo:tipoVeicolo.TipoMezzo,
      stato: tipoVeicolo.Stato,
      idveicolo:prenotazione.IDVeicolo,
      consegnato:prenotazione.Consegnato,
      autista:prenotazione.Autista,
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
})};
//modifica prenotazione
//post da fare :C


//nuova prenotazione
//creazione nuova riga nelle prenotazioni
//query enorme per cercare i veicoli disponibili incrociando i dati delle prenotazioni e dei veicoli
//se un veicolo non è prenotato allora si rende disponibile

//recupero password

exports.signin = (req, res) => {
  Utente.findOne({
    where: {
      Email: req.body.Email
    }
  })
    //controllo dell'esistenza di un profilo Utente
    .then(Utente => {
      if (!Utente) {
        return res.status(404).send({ message: "Utente non trovato." });
      }
      return res.status(200).send({ message: "Mail inviata." });
    })
    //catch di errore generico tipo 500
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//notifica ritardo
//creare nuova riga nella notifica ritardo



//consegna veicoli addetto 
//lista delle prenotazioni con macchina non consegnata
exports.daConsegnare = (req, res) => {
  Prenotazione.findAll({
    where: {
      Consegnato: false,
      Stato:"attiva"
    }
  })
    .then(prenotazione => {
      if (!prenotazione) {
        return res.status(404).send({ message: "nessun veicolo disponibile." });
      }
      let veicolo = prenotazione.getVeicolo();

    res.status(200).send({
      id: veicolo.IDVeicolo,
      targa: veicolo.Targa,
    }
        )})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//query per aggiornare lo stato dei veicoli 


//consegna veicoli cliente
//query per cambiare lo stato in conclusa tramite id prenotazione



//Ritiro veicoli
//Selezionare i veicoli ritirabili dal cliente, prendo idVeicolo dalle prenotazioni attive e con il 
//flag consegnato a 1 così so che per quelle prenotazioni devo ritirare;
//Aggiornare prenotazione con stato "in corso"




//Veicoli
//selezionare i veicoli di cui verificare le condizioni, prendnendo gli id delle prenotazioni con stato non concluso
//aggiorna tabella prenotazioni con lo stato in corso
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
        id: veicolo.IDVeicolo,
        tipoVeicolo: tipoVeicolo.TipoMezzo,
        numeroPosti: veicolo.NumeroPosti,
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