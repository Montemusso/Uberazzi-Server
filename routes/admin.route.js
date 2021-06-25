const { authJwt } = require("../middleware");
const controller = require("../controller/admin.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  app.get(
    "/api/utenti",
    [
      authJwt.verifyToken
      , authJwt.isAdmin
    ],
    controller.utenti
  )

  app.get(
    "/api/aggiorna_permesso",
    [
      authJwt.verifyToken
      , authJwt.isAdmin
    ],
    controller.aggiorna_permesso
  )

  app.get(
    "/api/prenotazioni_attive",
    [
      authJwt.verifyToken
      , authJwt.isAdmin
    ],
    controller.prenotazioni_attive
  )
};