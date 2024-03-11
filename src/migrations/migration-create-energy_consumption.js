'use strict';

let up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('energy_consumptions', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        department_id: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        date: {
            allowNull: false,
            type: Sequelize.STRING
        },
        energy_consumption: {
            allowNull: false,
            type: Sequelize.TEXT
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
    await queryInterface.dropTable('energy_consumptions');
}
module.exports = {
    down: down,
    up: up
}