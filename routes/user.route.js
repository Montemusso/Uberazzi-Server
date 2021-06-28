const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");
const addToDb = require("../controller/upload.photo");

//In questo modulo vengono definite le rotte verso i controller che dovranno poi servire effettivamente i file
//qui si verifica se si è un utente autenticato o no ed in caso quale permesso si ha
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /*                //*
   *                //*
   * Richieste get  //*
   *                //*
   */               //*


  app.get(
    "/api/esistenza_email",
    controller.VerificaEmail
  );


  app.get(
    "/api/prenotazioni",
    [authJwt.verifyToken],
    controller.prenotazioni
  );

 app.get(
    "/api/dettagli_prenotazione",
    [authJwt.verifyToken],
    controller.dettagli_prenotazione
  );

  app.get(
    "/api/ultime_prenotazioni",
    [authJwt.verifyToken],
    controller.ultime_prenotazioni
  );

   app.get(
    "/api/veicoli_disponibili",
    [authJwt.verifyToken],
    controller.DisponibilitaVeicoli
  );

  app.get(
    "/api/notifica_ritardo",
    [authJwt.verifyToken],
    controller.inviaNotifica
  );

  app.get(
    "/api/aggiorna_prenotazione",
    [authJwt.verifyToken],
    controller.salvaPrenotazione
  );

  app.get(
    "/api/consegne_veicoli_cliente",
    [
      authJwt.verifyToken
      ],
    controller.consegne_veicoli_cliente
  );

  app.get(
    "/api/veicoli_ritirabili_cliente",
    [
      authJwt.verifyToken
      ],
    controller.veicoli_ritirabili_cliente
  );

  app.get(
    "/api/consegna_veicolo_Cliente",
    [
      authJwt.verifyToken
      ],
    controller.consegna_veicolo_Cliente
  );

  app.get(
    "/api/ritira_veicolo_Cliente",
    [
      authJwt.verifyToken
      ],
    controller.ritira_veicolo_Cliente
  );

  app.get(
    "/api/recupera_password",
    controller.recupera_password
  );

  app.get(
    "/api/nuovo_pagamento",
    [authJwt.verifyToken],
    controller.nuovo_pagamento
  );

  app.get("/", controller.Homepage);

  /*                //*
   *                //*
   * Richieste post //*
   *                //*
   */               //*

   app.post(
     '/api/nuova_prenotazione',
   [authJwt.verifyToken],
   controller.nuova_prenotazione
   )  
   
   app.post(
    "/api/aggiorna_utente",
    [authJwt.verifyToken],
    controller.ModificaDati
  );
  
};


/*
funzioni per verifica dei permessi:
isAdmin
isAutenticato
isAddettoParcheggio
isUtente
isAutista
*/