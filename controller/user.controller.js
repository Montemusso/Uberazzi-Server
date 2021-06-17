//Questo file serve solo a verificare che la protezione delle rotte funzioni  
  
  
  exports.allAccess = (req, res) => {
    res.status(200).send("Utente non registrato.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Utente.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Autista.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("addetto parcheggio.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("admin.");
  };