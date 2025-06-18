'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parents', {
      id_utilisateur: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Utilisateurs',
          key: 'id_utilisateur'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Parents');
  }
};