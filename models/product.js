const {DataTypes} = require("sequelize");
const instance = require("../connection");

const product = instance.sequelize.define("products", {
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      code: {
        type:DataTypes.STRING,
        allowNull: false
      },

      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      xs: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
      s: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      m: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      l: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      xl: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      xl_2: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

    }, {
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "products"
    }
    
)



exports.model = product;