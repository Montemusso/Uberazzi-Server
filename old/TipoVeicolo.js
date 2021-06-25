module.exports = (sequelize, Sequelize) => {
    const TipoVeicolo = sequelize.define("TipoVeicolo", {
      IDTipoVeicolo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      DettaglioTipologia: {
        type: Sequelize.STRING(1000)
      },
      TipoMezzo: {
        type: Sequelize.STRING(1000)
      },
    });
  
    return TipoVeicolo;
  };