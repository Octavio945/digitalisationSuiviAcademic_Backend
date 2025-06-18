'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bulletins', {
      id_bulletin: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moyenne: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      contenu: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('Bulletins');
  }
};