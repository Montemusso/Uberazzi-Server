module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Permessi", {
      IDPermesso: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Permessi;
  };