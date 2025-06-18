'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type_composition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      utilisateur_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Apprenants',
          key: 'id_utilisateur'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      periode_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Periodes',
          key: 'id_periode'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      matiere_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Matieres',
          key: 'id_matiere'
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
    await queryInterface.dropTable('Compositions');
  }
};