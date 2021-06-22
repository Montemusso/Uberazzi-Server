//const config = require("../config/db.config.js");
const env = process.env;
const dotenv = require('dotenv');
dotenv.config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Utente = require("../model/Utente.js")(sequelize, Sequelize);
db.Permesso = require("../model/Permesso.js")(sequelize, Sequelize);
db.Pagamento = require("../model/Pagamento.js")(sequelize, Sequelize);
db.Parcheggio = require("./Parcheggio.js")(sequelize, Sequelize);
db.Prenotazione = require("../model/Prenotazione.js")(sequelize, Sequelize);
db.TipoVeicolo = require("../model/TipoVeicolo.js")(sequelize, Sequelize);
db.Veicolo = require("../model/Veicolo.js")(sequelize, Sequelize);
db.Immagine = require("../model/Immagine.js")(sequelize, Sequelize);
db.NotificheRitardo = require("../model/NotificheRitardo.js")(sequelize, Sequelize);


db.Permesso.hasMany(db.Utente, {foreignKey: 'IDPermesso'} );
db.Utente.hasMany(db.Prenotazione, {foreignKey: 'IDUtente'} );
db.Veicolo.belongsTo(db.TipoVeicolo, {foreignKey: 'IDTipoVeicolo'});
db.Veicolo.hasMany(db.Immagine, {foreignKey: 'IDVeicolo'} );
db.Pagamento.hasOne(db.Prenotazione, {foreignKey: 'IDPrenotazione'});
db.Parcheggio.hasMany(db.Veicolo, {foreignKey: 'IDParcheggio'} );
db.Veicolo.hasMany(db.Prenotazione, {foreignKey: 'IDVeicolo'} );
db.NotificheRitardo.belongsTo(db.Prenotazione, {foreignKey: 'IDPrenotazione'});


db.Ruoli = ["Utente", "Autista", "AddettoParcheggio","Amministratore"];

module.exports = db;