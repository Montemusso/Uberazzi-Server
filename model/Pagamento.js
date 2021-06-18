module.exports = (sequelize, Sequelize) => {
    const Pagamento = sequelize.define("Pagamento",{
        IDPagamento:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        IDPrenotazione:{
            type: Sequelize.INTEGER
        },
        DataOra:{
            type: Sequelize.DATE

        },
        Importo:{
            type: Sequelize.STRING           
        }
    });

    return Pagamento;
}