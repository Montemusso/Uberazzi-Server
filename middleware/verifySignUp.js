const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

//verifica di univocità della Email
controllaMail = (req, res, next) => {
    // Email
    Utenti.findOne({
      where: {
        email: req.body.email
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