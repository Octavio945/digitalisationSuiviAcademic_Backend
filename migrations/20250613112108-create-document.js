'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Documents', {
      id_document: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fichier: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type_document: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_document: {
        type: Sequelize.DATE,
        allowNull: false
      },
      utilisateur_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id_utilisateur'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Documents');
  }
};