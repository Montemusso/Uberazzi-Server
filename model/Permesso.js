module.exports = (sequelize, Sequelize) => {
    const Permesso = sequelize.define("Permesso", {
      IDPermesso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      DettagioPermesso: {
        type: Sequelize.STRING(100)
      }
    });
  
    return Permesso;
  };