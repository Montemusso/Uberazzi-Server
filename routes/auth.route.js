const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");
//Modulo per il registrazione e autenticazione degli utenti
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
//se viene chiamata la rotta /api/auth/signup viene 
  app.post(
    "/api/auth/signup",
    [verifySignUp.controllaMail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};