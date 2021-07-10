const {DataTypes} = require("sequelize");
const instance = require("../connection");

const account = instance.sequelize.define("accounts", {
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

      email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      Number: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull:false
      },

      accountType:{
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "accounts"
    }
    
)



exports.model = account;