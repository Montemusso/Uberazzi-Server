module.exports = (sequelize, Sequelize) => {
    const Veicolo = sequelize.define("Veicolo", {
      IDVeicolo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      IDTipoVeicolo: {
        type: Sequelize.STRING
      },
      Condizioni: {
        type: Sequelize.STRING
      },
      Prenotabile: {
        type: Sequelize.BOOLEAN
      },
      NumeroPosti: {
        type: Sequelize.INTEGER
      },
      Targa: {
        type: Sequelize.STRING
      },
      IDImmagine: {
        type: Sequelize.STRING
      },
      IDParcheggio: {
        type: Sequelize.INTEGER
      }
    });
  
    return Veicolo;
  };