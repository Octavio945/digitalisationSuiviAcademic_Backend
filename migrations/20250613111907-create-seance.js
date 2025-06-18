'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seances', {
      id_seance: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jour: {
        type: Sequelize.STRING,
        allowNull: false
      },
      heure_debut: {
        type: Sequelize.TIME,
        allowNull: false
      },
      heure_fin: {
        type: Sequelize.TIME,
        allowNull: false
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
      matiere_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Matieres',
          key: 'id_matiere'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      enseignant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Enseignants',
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
    await queryInterface.dropTable('Seances');
  }
};