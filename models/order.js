const {DataTypes} = require("sequelize");
const instance = require("../connection");

const order = instance.sequelize.define("orders", {
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      productid:{
        type: DataTypes.BIGINT,
        allowNull: false
      },

      uid: {
        type: DataTypes.STRING,
        allowNull: false
      },

      quantity: {
        type: DataTypes.BIGINT,
        allowNull: false
      },

    size:{
        type: DataTypes.STRING,
        allowNull: false
      },

      total:{
        type: DataTypes.BIGINT,
        allowNull: false
      },

      stat:{
        type: DataTypes.BIGINT,
        allowNull: false
      },

    }, {
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "orders"
    }
    
)



exports.model = order;