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