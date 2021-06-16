module.exports = (sequelize, Sequelize) => {
    const Parcheggio = sequelize.define("parcheggio", {
        IDParcheggio:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Note:{
            type: Sequelize.STRING
        },
        Indirizzo:{
            type: Sequelize.STRING
        },
        CAP:{
            type: Sequelize.INTEGER
        },
        NumeroPosti:{
            type: Sequelize.INTEGER
        },
        PostiOccupati:{
            type: Sequelize.INTEGER
        }
    });
}