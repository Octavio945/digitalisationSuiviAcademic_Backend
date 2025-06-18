'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Suivres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_suivre: {
        type: Sequelize.DATE,
        allowNull: false
      },
      statut: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seance_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Seances',
          key: 'id_seance'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Suivres');
  }
};