const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");
const addToDb = require("../controller/upload.photo");
let ts = Date.now();

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
    controller.esistenza_email
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
    controller.veicoli_disponibili
  );

  app.get(
    "/api/notifica_ritardo",
    [authJwt.verifyToken],
    controller.notifica_ritardo
  );

  app.get(
    "/api/aggiorna_utente",
    [authJwt.verifyToken],
    controller.aggiorna_utente
  );

  app.get(
    "/api/aggiorna_prenotazione",
    [authJwt.verifyToken],
    controller.aggiorna_prenotazione
  );

//prova per body
app.get(
  "/api/body",
 controller.body
);

app.post(
  "/api/body",
 controller.body
);


  app.get("/", controller.Homepage);

  /*                //*
   *                //*
   * Richieste post //*
   *                //*
   */               //*

  app.post('/api/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Nessun file caricato.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '../Public/upload/' + ts +sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      const dbres = addToDb(sampleFile.name, uploadPath, req.query.IDVeicolo);
      console.log(dbres);
      res.send({message:'File caricato!'});
    });
  });

  
};


/*
funzioni per verifica dei permessi:
isAdmin
isAutenticato
isAddettoParcheggio
isUtente
isAutista
*/