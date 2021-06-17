//Questo file serve solo a verificare che la protezione delle rotte funzioni  
//Diventerà il controller che servirà i dati  
  
var path = require('path');

  exports.Homepage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname+'/build/index.html'));
  };
  
  exports.listaVeicoli = (req, res) => {
    res.status(200).sendJson("query sequelizy per prendere tutti i veicoli disponibili.");
  };
  
  exports.listaPrenotazioni = (req, res) => {
    res.status(200).sendJson("query sequelize per prendere le prenotazioni della persona");
  };
  
  exports.listaPosteggi = (req, res) => {
    res.status(200).sendJson("query sequelize per prendere la lista dei posteggi");
  };
  
  exports.listaUtenti = (req, res) => {
    res.status(200).sendJson("query sequelize per prendere la lista degli utenti");
  };

  exports.listaCorse = (req, res) => {
    res.status(200).sendJson("query sequelize per prendere la lista delle corse");
  };