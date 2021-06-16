const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Utente = require("../model/Utente.js")(sequelize, Sequelize);
db.Permesso = require("../model/Permessi.js")(sequelize, Sequelize);
db.Pagamento = require("../model/Pagamento.js")(sequelize, Sequelize);
db.Parcheggio = require("../model/parcheggio.js")(sequelize, Sequelize);
db.Prenotazioni = require("../model/Prenotazione.js")(sequelize, Sequelize);
db.TipoVeicolo = require("../model/TipoVeicolo.js")(sequelize, Sequelize);
db.Veicolo = require("../model/Veicolo.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;