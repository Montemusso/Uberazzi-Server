module.exports = (sequelize, Sequelize) => {
    const Immagine = sequelize.define("Immagine", {
        IDImmagine:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Filename:{
            type: Sequelize.STRING
        },
        Path:{
            type: Sequelize.STRING
        },
        IDVeicolo:{
            type: Sequelize.STRING
        },
    });
    return Immagine;
}