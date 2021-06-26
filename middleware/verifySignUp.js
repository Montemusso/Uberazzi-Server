const db = require("../model");
const Utente = db.Utente;

//verifica di univocità della Email
controllaMail = (req, res, next) => {
    // Email
    Utente.findOne({
      where: {
        Email: req.body.Email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Email già in uso!"
        });
        return;
      }
      else{
        res.status(200).send({
          message: "email disponibile!"
        })
      }
      next();
    });
  };

const verifySignUp = {
  controllaMail: controllaMail
};

module.exports = verifySignUp;