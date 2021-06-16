const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

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

      next();
    });
  };

const verifySignUp = {
  controllaMail: controllaMail
};

module.exports = verifySignUp;