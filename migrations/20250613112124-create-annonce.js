'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Annonces', {
      id_annonce: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre_annonce: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contenu_annonce: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      date_annonce: {
        type: Sequelize.DATE,
        allowNull: false
      },
      visibilite: {
        type: Sequelize.STRING,
        allowNull: false
      },
      images_annonce: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Annonces');
  }
};