module.exports = (sequelize, Sequelize) => {
    const Prenotazione = sequelize.define("Prenotazione", {
      IDPrenotazione: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      
      IDUtente: {
        type: Sequelize.INTEGER
      },
      Partenza: {
        type: Sequelize.STRING(1000)
      },
      Arrivo: {
        type: Sequelize.STRING(1000)
      },
      Stato: {
        type: Sequelize.STRING(100)
      },
      DataOra: {
        type: Sequelize.DATE
      },
      DataOraArrivo: {
        type: Sequelize.DATE
      },
      IDAutista: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      Autista: {
        type: Sequelize.BOOLEAN
      },
      Consegnato: {
        type: Sequelize.BOOLEAN
      },
      IDVeicolo: {
        type: Sequelize.INTEGER
      },
    });
  
    return Prenotazione;
  };