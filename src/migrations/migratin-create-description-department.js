'use strict';

let up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('description_departments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name_location_department: {
            allowNull: false,
            type: Sequelize.STRING
        },
        image: {
            allowNull: false,
            type: Sequelize.BLOB('long')
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
}
let down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('description_departments');
}
module.exports = {
    down: down,
    up: up
}