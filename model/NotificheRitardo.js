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
      IDUtente:{
        type: Sequelize.INTEGER
      },
      Note: {
        type: Sequelize.STRING(1000)
      },
    });
  
    return NotificheRitardo;
  };