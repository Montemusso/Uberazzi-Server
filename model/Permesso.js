module.exports = (sequelize, Sequelize) => {
    const Permesso = sequelize.define("Permesso", {
      IDPermesso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Permesso;
  };