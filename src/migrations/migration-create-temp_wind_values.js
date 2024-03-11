'use strict';

let up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('temp_wind_values', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
           
            type: Sequelize.INTEGER
        },

        date: {
            allowNull: false,
           type: Sequelize.STRING
        },
        temperature: {
            allowNull: false,
            type: Sequelize.DOUBLE
        },
        humidy: {
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
module.exports = {
    up: up,
    down: down
}