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

//Homepage
  exports.Homepage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname+'/build/index.html'));
  };
  
//Pagina Profilo:
//Query: ultime tre prenotazioni con ritorno id, data e stato
//aggiornare dati utente
//lista prenotazioni ritorna i dati delle ultime 3 prenotazioni effettuate
exports.ultime_prenotazioni = (req, res) => {
  Prenotazione.findAll({
    where: {
      IDUtente: req.query.IDUtente
    },
    order:[['DataOra', 'DESC']],
    include:[{
      model: Veicolo
    },{
      model: TipoVeicolo
    }],
    limit:3
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
//Aggiorna dati utente:
//Da fare con post


//Pagina prenotazioni
//Selezionare tutte le prenotazioni 
exports.prenotazioni = (req, res) => {
  Prenotazione.findAll({
    where: {
      IDUtente: req.params.IDUtente
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

//modifica prenotazioni
//seleziona la prenotazione singola e ritornane i dati
exports.dettagli_prenotazione = (req, res) => {
  Prenotazione.findOne({
    where: {
      IDPrenotazione: req.query.IDPrenotazione
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
//modifica prenotazione
//post da fare :C


//nuova prenotazione
//creazione nuova riga nelle prenotazioni
exports.nuova_prenotazione = (req, res) => {
  // Crea prenotazione nel database
  Prenotazione.create({
    IDUtente: req.body.IDUtente,
    Partenza:req.body.Partenza,
    Arrivo:req.body.Arrivo,
    Stato: "In corso",
    DataOra:req.body.DataOra,
    Autista:req.body.Autista,
    IDVeicolo:req.body.IDVeicolo,
    Consegnato:false
  })
  .then( res.status(200).send({ message:"Prenotazione creata" }))
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//query enorme per cercare i veicoli disponibili incrociando i dati delle prenotazioni e dei veicoli
exports.veicoli_disponibili = (req, res) => {
  Prenotaizone.findAll({
    attributes : IDVeicolo, //prendo solo la colonna degli id
    where:{
      [Op.or]: [ //faccio gli or tra le condizioni
        { DataOra: {[Op.lt]: req.query.Partenza} }, //arrivo prima di dover far usare il mezzo al prossimo utente
        { DataOraArrivo: {[Op.gt]: req.query.Arrivo} } //la mia partenza è dopo che un altro utente ha usato il mezzo
      ]
    }
  })
  .then(idveicoli => Veicolo.findAll({
    where: {
      Prenotabile: true,
      IDVeicolo:[...idveicoli]
    },
    order:[['DataOra', 'DESC']],
    include:[{
      model: Veicolo
    },{
      model: TipoVeicolo
    }]
  }))
    .then(prenotazione => {
      if (!prenotazione) {
        return res.status(404).send({ message: "nessun veicolo effettuata." });
      }

    res.status(200).send(
      prenotazione
    )})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//se un veicolo non è prenotato allora si rende disponibile

//recupero password

exports.esistenza_email = (req, res) => {
  Utente.findOne({
    where: {
      Email: req.query.Email
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
exports.notifica_ritardo = (req, res) => {
  // Crea notifica ritardo nel database
  NotificheRitardo.create({
    IDPrenotazione: req.query.IDPrenotazione,
    Note: req.query.note,
  })
  .then( res.status(200).send({ message:"notifica creata" }))
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


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


//consegna veicoli cliente
//query per cambiare lo stato in conclusa tramite id prenotazione



//Ritiro veicoli
//Selezionare i veicoli ritirabili dal cliente, prendo idVeicolo dalle prenotazioni attive e con il 
//flag consegnato a 1 così so che per quelle prenotazioni devo ritirare;
//Aggiornare prenotazione con stato "in corso"




//Veicoli
//selezionare i veicoli di cui verificare le condizioni, prendnendo gli id delle prenotazioni con stato non concluso da scrivere in raw sql
//aggiorna tabella prenotazioni con lo stato in corso


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
    }],
    limit:3
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