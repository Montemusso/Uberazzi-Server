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
    "/api/listaParcheggi",
    [
      authJwt.verifyToken, 
      authJwt.isAddettoParcheggio
    ],
    controller.listaParcheggi
  );

  app.get(
    "/api/listaUtenti",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.listaUtenti
  );

  app.get(
    "/api/listaCorse",
    [authJwt.verifyToken, authJwt.isAutista],
    controller.listaCorse
  )

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
    uploadPath = __dirname + './Public/upload/' + ts +sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      const dbres = addToDb(sampleFile.name, uploadPath, req.query.IDVeicolo);
      console.log(dbres);
      res.send({message:'File caricato!'});
    });
  });

  /*                //*
   *                //*
   * handle 404     //*
   *                //*
   */               //*
  app.use(function(req, res, next) {
    res.status(404);
    // risposta con html
    if (req.accepts('html')) {
      res.send('404, pagina non trovata');
      return;
    }
    // risposta con json
    if (req.accepts('json')) {
      res.json({ error: '404, pagina non trovata' });
      return;
    }
    // default con txt
    res.type('txt').send('404, pagina non trovata');
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