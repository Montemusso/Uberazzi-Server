const { authJwt } = require("../middleware");
const controller = require("../controller/addettoparcheggio.controller");

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
  
app.get(
    "/api/consegne_veicoli",
    [
      authJwt.verifyToken,
       authJwt.isAddettoParcheggio
      ],
    controller.consegne_veicoli
  );

  app.get(
    "/api/aggiorna_stato_veicolo",
    [
      authJwt.verifyToken,
       authJwt.isAddettoParcheggio
      ],
    controller.aggiorna_stato_veicolo
  );

  app.post(
    "/api/aggiorna_condizioni_veicolo",
    [
      authJwt.verifyToken,
       authJwt.isAddettoParcheggio
      ],
    controller.aggiorna_condizioni_veicolo
  );

  app.get(
    "/api/aggiorna_stato_prenotazione",
    [
      authJwt.verifyToken,
       authJwt.isAddettoParcheggio
      ],
    controller.aggiorna_stato_prenotazione
  );

  app.get(
    "/api/veicoli_ritirabili",
    [
      authJwt.verifyToken,
       authJwt.isAddettoParcheggio
      ],
    controller.veicoli_ritirabili
  );

  app.get(
    "/api/condizioni_veicoli",
    [
      authJwt.verifyToken,
       authJwt.isAddettoParcheggio
      ],
    controller.richiediCondizioni
  );
 
  app.get(
    "/api/aggiorna_disponibilita_veicolo",
    [
      authJwt.verifyToken,
       authJwt.isAddettoParcheggio
      ],
    controller.contrassegnaDisponibile
  );


  app.get(
    "/api/consegna_veicolo_AddettoParcheggio",
    [
      authJwt.verifyToken,
      authJwt.isAddettoParcheggio
      ],
    controller.consegna_veicolo_AddettoParcheggio
  );

  app.get(
    "/api/ritira_veicolo_AddettoParcheggio",
    [
      authJwt.verifyToken,
      authJwt.isAddettoParcheggio
      ],
    controller.ritira_veicolo_AddettoParcheggio
  );
    };