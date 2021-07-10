'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('products', { 
      id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      code: {
        type:Sequelize.STRING,
        allowNull: false
      },

      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      xs: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      
      s: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      m: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      l: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      xl: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      xl_2: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }

  
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('products');
    
  }
};
