'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inscriptions', {
      id_inscription: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_inscription: {
        type: Sequelize.DATE,
        allowNull: false
      },
      annee_scolaire: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statut: {
        type: Sequelize.STRING,
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
      classe_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes',
          key: 'id_classe'
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
    await queryInterface.dropTable('Inscriptions');
  }
};