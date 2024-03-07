'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Temp_Wind_Values extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            
        }
    };
    Temp_Wind_Values.init({
        date: DataTypes.STRING,
        temperature: DataTypes.STRING,
        windSpeed: DataTypes.STRING,
    }, {

        sequelize,
        modelName: 'Temp_Wind_Value',
    });
    return Temp_Wind_Values;
};