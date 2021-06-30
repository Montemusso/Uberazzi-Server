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
    "/api/ultime_notifiche",
    [authJwt.verifyToken],
    controller.ultime_notifiche_cliente
  );

  app.get(
    "/api/veicoli_disponibili",
    [authJwt.verifyToken],
    controller.DisponibilitaVeicoli
  );

  app.get(
    "/api/lista_veicoli",
    [
      authJwt.verifyToken,
    ],
    controller.lista_veicoli
  )

  app.get(
    "/api/immagine",
    [authJwt.verifyToken],
    controller.immagine
  );

  app.get(
    "/api/notifica_ritardo",
    [authJwt.verifyToken],
    controller.inviaNotifica
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

  app.get(
    "/api/aggiorna_stato_prenotazione_cliente",
    [
      authJwt.verifyToken,
      ],
    controller.aggiorna_stato_prenotazione_cliente
  );

  app.get(
    "/api/info_veicolo",
    [
      authJwt.verifyToken,
      ],
    controller.info_veicolo
  );

  app.get(
    "/api/aggiorna_pagamento",
    [
      authJwt.verifyToken,
      ],
    controller.aggiorna_pagamento
  );

  app.get("/pagamento", controller.Pagamento);
  app.get("/:home?", controller.Homepage);

  /*                //*
   *                //*
   * Richieste post //*
   *                //*
   */               //*

   app.post(
     '/api/nuova_prenotazione',
   [authJwt.verifyToken],
   controller.nuova_prenotazione
   );
   
   app.post(
    "/api/aggiorna_prenotazione",
    [authJwt.verifyToken],
    controller.salvaPrenotazione
  );  
   
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