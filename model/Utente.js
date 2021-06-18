module.exports = (sequelize, Sequelize) => {
    const Utente = sequelize.define("Utente", {
      IDUtente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Nome: {
        type: Sequelize.STRING(50)
      },
      Cognome: {
        type: Sequelize.STRING(50)
      },
      DataDiNascita: {
        type: Sequelize.DATE
      },
      CodiceFiscale: {
        type: Sequelize.STRING(16)
      },
      Indirizzo: {
        type: Sequelize.STRING(200)
      },
      CAP: {
        type: Sequelize.INTEGER(5)
      },
      Email: {
        type: Sequelize.STRING(200)
      },
      password: {
        type: Sequelize.TEXT('medium')
      },
      NumeroPatente: {
        type: Sequelize.STRING(10),
        allowNull:true
      },
      TipoPatente: {
        type: Sequelize.STRING(7),
        allowNull:true
      },
      IDPermesso: {
        type: Sequelize.INTEGER,
        
      },
    });
  
    return Utente;
  };