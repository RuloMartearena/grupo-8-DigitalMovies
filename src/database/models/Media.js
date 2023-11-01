module.exports = (sequelize, dataTypes) => {

    const Media = sequelize.define(
        "Media", 
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            genre: {
                type: dataTypes.STRING,
            },
            image: {
                type: dataTypes.STRING,
            },
            link: {
                type: dataTypes.STRING,
            },
            rating: {
                type: dataTypes.INTEGER,
            },
            synopsis: {
                type: dataTypes.STRING,
            },
            title: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: dataTypes.DECIMAL,
            }
        },
        {
            tableName: "media",
            timestamp: false,
            createdAt: false,
            updatedAt: false,
        }
    )

    //Media.associate = function(models){
    //    Cart.belongsTo(models.Carts, {
    //        as: "carts",
    //        foreignkEY: "product_id"
    //    })
    //}
    return Media;
}