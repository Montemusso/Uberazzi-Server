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
      max: 20,
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

db.Permesso.hasMany(db.Utente, {foreignKey: 'IDPermesso',  foreignKeyConstraint: true});                                 //RELAZIONE OK
db.Utente.belongsTo(db.Permesso, {foreignKey: 'IDPermesso',  foreignKeyConstraint: true});                               //RELAZIONE OK

db.Prenotazione.belongsTo(db.Utente, {foreignKey: 'IDCliente', foreignKeyConstraint: true});                             //RELAZIONE OK
db.Prenotazione.belongsTo(db.Utente, {foreignKey: 'IDAutista', foreignKeyConstraint: true});                             //RELAZIONE OK

db.Veicolo.hasMany(db.Immagine, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true});                                  //RELAZIONE OK
db.Immagine.belongsTo(db.Veicolo, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true});                                //RELAZIONE OK

db.Pagamento.belongsTo(db.Prenotazione, {foreignKey: 'IDPrenotazione', foreignKeyConstraint: true});                     //RELAZIONE OK
db.Prenotazione.hasOne(db.Pagamento,{foreignKey: 'IDPrenotazione', foreignKeyConstraint: true});                         //RELAZIONE OK

db.Parcheggio.hasMany(db.Veicolo, {foreignKey: 'IDParcheggio', targetKey:'IDParcheggio', foreignKeyConstraint: true});   //RELAZIONE OK
db.Veicolo.belongsTo(db.Parcheggio, {foreignKey: 'IDParcheggio', foreignKeyConstraint: true});                           //RELAZIONE OK

db.Veicolo.hasMany(db.Prenotazione, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true});                              //RELAZIONE OK
db.Prenotazione.belongsTo(db.Veicolo, {foreignKey: 'IDVeicolo', foreignKeyConstraint: true});                            //RELAZIONE OK

db.NotificheRitardo.belongsTo(db.Prenotazione, {foreignKey: 'IDPrenotazione', foreignKeyConstraint: true});              //RELAZIONE OK
db.Prenotazione.hasMany(db.NotificheRitardo, {foreignKey: 'IDPrenotazione', foreignKeyConstraint: true});                //RELAZIONE OK

//Creazione dei permessi e dei parcheggi che saranno già presenti nel database all'avvio
var parch1 = db.Parcheggio.build({IDParcheggio:1, Note:'Parcheggio1', Indirizzo:'Via Amerigo Vespucci 20', CAP:90100, NumeroPosti: 50, PostiOccupati:12});
parch1.save();
var parch2 = db.Parcheggio.build({IDParcheggio:2, Note:'Parcheggio2', Indirizzo:'Via Primo Carnera 5', CAP:90100, NumeroPosti: 70, PostiOccupati:66});
parch2.save();
var parch3 = db.Parcheggio.build({IDParcheggio:3, Note:'Parcheggio3', Indirizzo:'Via Emerico Amari 12', CAP:90100, NumeroPosti: 30, PostiOccupati:22});
parch3.save();
var parch4 = db.Parcheggio.build({IDParcheggio:4, Note:'Parcheggio4', Indirizzo:'Via Uditore 67', CAP:90100, NumeroPosti: 40, PostiOccupati:22});
parch4.save();
var perm1 = db.Permesso.build({IDPermesso:1, DettaglioPermesso:'Cliente'});
perm1.save();
var perm2 = db.Permesso.build({IDPermesso:2, DettaglioPermesso:'AddettoParcheggio'});
perm2.save();
var perm3 = db.Permesso.build({IDPermesso:3, DettaglioPermesso:'Autista'});
perm3.save();
var perm4 = db.Permesso.build({IDPermesso:4, DettaglioPermesso:'Amministratore'});
perm4.save();

module.exports = db;

