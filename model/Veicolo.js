
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
        type: Sequelize.STRING(1000)
      },
      Prenotabile: {
        type: Sequelize.BOOLEAN
      },
      NumeroPosti: {
        type: Sequelize.INTEGER(2)
      },
      Prezzo: {
        type: Sequelize.FLOAT
      },
      Targa: {
        type: Sequelize.STRING(10)
      },
      IDParcheggio: {
        type: Sequelize.INTEGER
      }
    });
  
    return Veicolo;
  };