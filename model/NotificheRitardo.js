module.exports = (sequelize, Sequelize) => {
    const NotificheRitardo = sequelize.define("NotificheRitardo", {
      IDNotifica: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      IDPrenotazione:{
        type: Sequelize.INTEGER
      },
      RuoloUtente:{
        type: Sequelize.STRING(1000)
      },
      Note: {
        type: Sequelize.STRING(1000)
      },
    });
  
    return NotificheRitardo;
  };