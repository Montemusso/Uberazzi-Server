const { authJwt } = require("../middleware");
const controller = require("../controller/autista.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
 
    app.get(
      "/api/corse",
      [
        authJwt.verifyToken
        , authJwt.isAutista
      ],
      controller.corse
    )

    app.get(
      "/api/conferma_corsa",
      [
        authJwt.verifyToken
        , authJwt.isAutista
      ],
      controller.AccettaCorsa
    )

    app.get(
      "/api/ultime_notifiche_autista",
      [authJwt.verifyToken
        , authJwt.isAutista],
      controller.ultime_notifiche_autista
    );
};