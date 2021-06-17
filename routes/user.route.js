const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
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
    "/api/listaVeicoli",
    [authJwt.verifyToken],
    controller.listaVeicoli
  );

  app.get(
    "/api/listaPrenotazioni",
    [authJwt.verifyToken],
    controller.listaPrenotazioni
  );

  app.get(
    "/api/listaPosteggi",
    [authJwt.verifyToken, authJwt.isAddettoParcheggio],
    controller.adminBoard
  );

  app.get(
    "/api/listaUtenti",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/listaCorse",
    [authJwt.verifyToken, authJwt.isAutista],
    controller.adminBoard
  )

  app.get("/", controller.Homepage);

  app.post(
    "/api/upload",
    [authJwt.verifyToken, authJwt.isAddettoParcheggio],
    
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