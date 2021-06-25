const { authJwt } = require("../middleware");
const controller = require("../controller/autista.controller");
const addToDb = require("../controller/upload.photo");
let ts = Date.now();

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
};