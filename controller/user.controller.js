//query varie
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

//Homepage
  exports.Homepage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname+'/build/index.html'));
  };


  exports.body = (req, res) => {
    console.log(req.body)
    res.status(200).send({message : req.body});
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
    }],
    limit:3
  })
    .then(ultime_prenotazioni => {
      if (!ultime_prenotazioni) {
        return res.status(404).send({ message: "nessuna prenotazione effettuata." });
      }    
    res.status(200).send(
      ultime_prenotazioni
    )})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//Aggiorna dati utente:
exports.aggiorna_utente = (req, res) => {
  Utente.update({
    Nome: req.body.Nome,
    Cognome: req.body.Cognome,
    DataDiNascita: req.body.DataDiNascita,
    CartaIdentita: req.body.CartaIdentita,
    Indirizzo: req.body.Indirizzo,
    CAP: req.body.CAP,
    Email: req.body.Email,
    NumeroPatente: req.body.NumeroPatente,
    TipoPatente: req.body.TipoPatente,
  },
    {
    where: {
      IDUtente: req.query.IDUtente
    },
  })
  .then(
    res.status(200).send({ message:"Prenotazione modificata" })
    )
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};


//Pagina prenotazioni
//Selezionare tutte le prenotazioni 
exports.prenotazioni = (req, res) => {
  Prenotazione.findAll({
    where: {
      IDUtente: req.query.IDUtente
    },
    order:[['DataOra', 'DESC']],
    include:[{
      model: Veicolo
    }]
  })
    .then(prenotazioni => {
      if (!prenotazioni) {
        return res.status(404).send({ message: "nessuna prenotazione effettuata." });
      }
    
    res.status(200).send(
      prenotazioni
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
    }]
  })
    .then(dettagli_prenotazione => {
      if (!dettagli_prenotazione) {
        return res.status(404).send({ message: "nessuna prenotazione effettuata." });
      }
    
    res.status(200).send(
      dettagli_prenotazione
    )})
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//modifica prenotazione
exports.aggiorna_prenotazione = (req, res) => {
  Prenotazione.update({
    IDUtente: req.body.IDUtente,
    Partenza:req.body.Partenza,
    Arrivo:req.body.Arrivo,
    Stato: "modificata",
    DataOra:req.body.DataOra,
    DataOraArrivo:req.body.DataOraArrivo,
    Autista:req.body.Autista,
    IDVeicolo:req.body.IDVeicolo,
    Consegnato:false
  },{
    where: {
      IDPrenotazione: req.query.IDPrenotazione
    }
  })
    .then(    
    res.status(200).send({ message:"Prenotazione modificata" })
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


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
    DataOraArrivo:req.body.DataOraArrivo,
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
    }]
  }))
    .then(veicoli_disponibili => {
      if (!veicoli_disponibili) {
        return res.status(404).send({ message: "nessun veicolo effettuata." });
      }

    res.status(200).send(
      veicoli_disponibili
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
    .then(esistenza_email => {
      if (!esistenza_email) {
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





exports.aggiorna_stato_prenotazione = (req, res) => {
  Prenotazione.update({
    Stato: req.query.Stato,
  },{
    where: {
      IDPrenotazione: req.query.IDPrenotazione
    }
  })
    .then(
    res.status(200).send({ message:"Prenotazione modificata" })
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


//consegna veicoli cliente
//query per cambiare lo stato in conclusa tramite id prenotazione