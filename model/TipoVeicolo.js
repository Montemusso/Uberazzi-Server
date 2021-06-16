module.exports = (sequelize, Sequelize) => {
    const TipoVeicolo = sequelize.define("TipoVeicolo", {
      IDTipoVeicolo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      DettaglioTipologia: {
        type: Sequelize.STRING
      },
      TipoMezzo: {
        type: Sequelize.STRING
      },
    });
  
    return TipoVeicolo;
  };