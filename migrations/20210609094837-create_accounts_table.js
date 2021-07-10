'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
      await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('accounts', {
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
  
        email: {
          type: Sequelize.STRING,
          unique:true,
          allowNull: false
        },
  
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
  
        Number: {
          type: Sequelize.STRING,
          unique:true,
          allowNull: false
        },
  
        address: {
          type: Sequelize.STRING,
          allowNull: false
        },
  
        password: {
          type: Sequelize.STRING,
          allowNull:false
        },
  
        accountType:{
          type: Sequelize.STRING,
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

     await queryInterface.dropTable('accounts');
  }
};
