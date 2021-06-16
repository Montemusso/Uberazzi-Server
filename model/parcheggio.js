module.exports = (sequelize, Sequelize) => {
    const Parcheggio = sequelize.define("parcheggio", {
        IDParcheggio:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Note:{

        },
        Indirizzo:{

        },
        CAP:{

        },
        NumeroPosti:{

        },
        PostiOccupati:{
            
        }
    });
}