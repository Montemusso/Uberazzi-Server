module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Prenotazione", {
      IDPrenotazione: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      IDUtente: {
        type: Sequelize.INTEGER
      },
      Partenza: {
        type: Sequelize.STRING
      },
      Arrivo: {
        type: Sequelize.STRING
      },
      DataOra: {
        type: Sequelize.DATA
      },
      IDAutista: {
        type: Sequelize.INTEGER
      },
      IDVeicolo: {
        type: Sequelize.INTEGER
      },
    });
  
    return Prenotazione;
  };