module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Utente", {
      IDUtente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Nome: {
        type: Sequelize.STRING
      },
      Cognome: {
        type: Sequelize.STRING
      },
      DataDiNascita: {
        type: Sequelize.DATE
      },
      CodiceFiscale: {
        type: Sequelize.STRING
      },
      Indirizzo: {
        type: Sequelize.STRING
      },
      CAP: {
        type: Sequelize.INTEGER
      },
      Sesso: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
      NumeroPatente: {
        type: Sequelize.STRING,
        allowNull:true
      },
      TipoPatente: {
        type: Sequelize.STRING,
        allowNull:true
      },
      Permessi: {
        type: Sequelize.INTEGER
      },
      
    });
  
    return Utente;
  };