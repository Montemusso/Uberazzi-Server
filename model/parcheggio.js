module.exports = (sequelize, Sequelize) => {
    const Parcheggio = sequelize.define("Parcheggio", {
        IDParcheggio:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Note:{
            type: Sequelize.STRING(1000),
            allowNull:true
        },
        Indirizzo:{
            type: Sequelize.STRING(1000)
        },
        CAP:{
            type: Sequelize.INTEGER(5),
            allowNull:true
        },
        NumeroPosti:{
            type: Sequelize.INTEGER(10),
            allowNull:true
        },
        PostiOccupati:{
            type: Sequelize.INTEGER(10),
            allowNull:true
        }
    });
    return Parcheggio;
}