'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coefficients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coef: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Coefficients');
  }
};