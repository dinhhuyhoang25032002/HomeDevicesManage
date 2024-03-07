'use strict';

let up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('temp_wind_values', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        date: {
            allowNull: false,
            type: Sequelize.STRING
        },
        windSpeed: {
            allowNull: false,
            type: Sequelize.DOUBLE
        },
        temperature: {
            allowNull: false,
            type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('temp_wind_values');
}
exports = {
    up, down
}