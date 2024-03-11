'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Energy_Consumption extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Energy_Consumption.belongsTo(models.Description_Department, { foreignKey: 'department_id', as: 'departmentData' });
            Energy_Consumption.belongsTo(models.Temp_Wind_Value, { foreignKey: 'date', as: 'dataDate' });
        }
    };
    Energy_Consumption.init({
        department_id: DataTypes.INTEGER,
        date: DataTypes.STRING,
        energy_consumption: DataTypes.TEXT,

    }, {

        sequelize,
        modelName: 'Energy_Consumption',
    });
    return Energy_Consumption;
};