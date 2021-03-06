const { authJwt } = require("../middleware");
const controller = require("../controller/admin.controller");
const fileUpload = require('express-fileupload');
const addToDb = require("../controller/upload.photo");


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
    controller.RichiestaUtenti
  )

  app.get(
    "/api/aggiorna_permesso",
    [
      authJwt.verifyToken
      , authJwt.isAdmin
    ],
    controller.ModificaPermessi
  )

  app.get(
    "/api/prenotazioni_attive",
    [
      authJwt.verifyToken
      , authJwt.isAdmin
    ],
    controller.RichiediDati
  )
  

  app.post(
    "/api/nuovo_veicolo",
    [
      authJwt.verifyToken,
      authJwt.isAdmin
    ],
    controller.nuovo_veicolo
  )


  app.post('/api/upload', 
  [
    authJwt.verifyToken,
    authJwt.isAdmin
  ],
  function(req, res) {
    let ts = Date.now();
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Nessun file caricato.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.immagine;
    uploadPath = '/home/uberazzi/codice/server/build/Public/upload/' + ts +sampleFile.name;
    dbPath = 'Public/upload/' + ts +sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      const dbres = addToDb.uploadPhoto(sampleFile.name, dbPath, req.query.IDVeicolo);
      //console.log(dbres);
      res.send({message:'File caricato!'});
    });
  });
};