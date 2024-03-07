'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Description_Department extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    Description_Department.init({
        name_location_department: DataTypes.STRING,
        image: DataTypes.TEXT,

    }, {

        sequelize,
        modelName: 'Description_Department',
    });
    return Description_Department;
};