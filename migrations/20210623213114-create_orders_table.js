'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('orders', {
      id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      productid:{
        type: Sequelize.BIGINT,
        allowNull: false
      },

      uid: {
        type: Sequelize.STRING,
        allowNull: false
      },

      quantity: {
        type: Sequelize.BIGINT,
        allowNull: false
      },

    size:{
        type: Sequelize.STRING,
        allowNull: false
      },

      total:{
        type: Sequelize.BIGINT,
        allowNull: false
      },

      stat:{
        type: Sequelize.BIGINT,
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

     await queryInterface.dropTable('orders');
  }
};
