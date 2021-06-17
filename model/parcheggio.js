module.exports = (sequelize, Sequelize) => {
    const Parcheggio = sequelize.define("Parcheggio", {
        IDParcheggio:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        Note:{
            type: Sequelize.STRING,
            allowNull:true
        },
        Indirizzo:{
            type: Sequelize.STRING
        },
        CAP:{
            type: Sequelize.INTEGER,
            allowNull:true
        },
        NumeroPosti:{
            type: Sequelize.INTEGER,
            allowNull:true
        },
        PostiOccupati:{
            type: Sequelize.INTEGER,
            allowNull:true
        }
    });
    return Parcheggio;
}