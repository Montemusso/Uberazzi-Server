
module.exports = (sequelize, Sequelize) => {
    const Veicolo = sequelize.define("Veicolo", {
      IDVeicolo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      TipoVeicolo: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING(10)
      },
      Targa: {
        type: Sequelize.STRING(10),
        allowNull:true
      },
      Nome: {
        type: Sequelize.STRING(100),
        allowNull:true
      }
    });
  
    return Veicolo;
  };