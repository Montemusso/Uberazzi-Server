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
db.Parcheggio = require("./Parcheggio.js")(sequelize, Sequelize);
db.Prenotazioni = require("../model/Prenotazione.js")(sequelize, Sequelize);
db.TipoVeicolo = require("../model/TipoVeicolo.js")(sequelize, Sequelize);
db.Veicolo = require("../model/Veicolo.js")(sequelize, Sequelize);
db.Immagine = require("../model/Immagine.js")(sequelize, Sequelize);


db.Permesso.hasMany(Utente, {foreignKey: 'IDPermesso'} );
db.Utente.hasMany(Prenotazione, {foreignKey: 'IDUtente'} );
db.Veicolo.belongsTo(TipoVeicolo, {foreignKey: 'IDTipoVeicolo'});
db.Veicolo.hasMany(Immagine, {foreignKey: 'IDVeicolo'} );
db.Pagamento.hasOne(Prenotazione, {foreignKey: 'IDPrenotazione'});
db.Parcheggio.hasMany(Veicolo, {foreignKey: 'IDParcheggio'} );
db.Veicolo.hasMany(Prenotazione, {foreignKey: 'IDVeicolo'} );


db.Ruoli = ["Utente", "Autista", "AddettoParcheggio","Amministratore"];

module.exports = db;