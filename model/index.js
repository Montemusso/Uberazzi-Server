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
db.Veicolo = require("../model/Veicolo.js")(sequelize, Sequelize);
db.Immagine = require("../model/Immagine.js")(sequelize, Sequelize);
db.NotificheRitardo = require("../model/NotificheRitardo.js")(sequelize, Sequelize);

/*RELAZIONI*/

db.Permesso.hasMany(db.Utente, {foreignKey: 'IDPermesso',  foreignKeyConstraint: true});  //RELAZIONE OK
db.Utente.belongsTo(db.Permesso, {foreignKey: 'IDPermesso',  foreignKeyConstraint: true}); //RELAZIONE OK

db.Prenotazione.belongsTo(db.Utente, {foreignKey: 'IDCliente', foreignKeyConstraint: true}); //RELAZIONE OK
db.Prenotazione.belongsTo(db.Utente, {foreignKey: 'IDAutista', foreignKeyConstraint: true}); //RELAZIONE OK
db.Utente.hasMany(db.Prenotazione, {foreignKey: 'IDUtente', foreignKeyConstraint: true});    //RELAZIONE AGGIUNTA

db.Veicolo.hasMany(db.Immagine, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true});      //RELAZIONE OK
db.Immagine.hasOne(db.Veicolo, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true});       //RELAZIONE AGGIUNTA

db.Pagamento.belongsTo(db.Prenotazione, {foreignKey: 'IDPrenotazione', foreignKeyConstraint: true});//RELAZIONE OK
db.Prenotazione.hasOne(db.Pagamento,{foreignKey: 'IDPrenotazione', foreignKeyConstraint: true});    //RELAZIONE AGGIUNTA

db.Parcheggio.hasMany(db.Veicolo, {foreignKey: 'IDParcheggio', targetKey:'IDParcheggio', foreignKeyConstraint: true}); //RELAZIONE OK
db.Veicolo.hasOne(db.Parcheggio, {foreignKey: 'IDParcheggio', foreignKeyConstraint: true});   //RELAZIONE OK

db.Prenotazione.belongsTo(db.Veicolo, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true}); //RELAZIONE OK
db.Veicolo.hasMany(db.Prenotazione, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true});   //RELAZIONE AGGIUNTA

db.NotificheRitardo.belongsTo(db.Prenotazione, {foreignKey: 'IDPrenotazione', foreignKeyConstraint: true}); //RELAZIONE OK
db.Prenotazione.hasMany(db.NotificheRitardo, {foreignKey: 'IDPrenotazione', foreignKeyConstraint: true});   //RELAZIONE AGGIUNTA

module.exports = db;
//hasOne hasMany--> sourceKey     belongsTo-->targetKey