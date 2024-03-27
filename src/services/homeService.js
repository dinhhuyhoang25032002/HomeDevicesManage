import db from '../models/index'
import _ from 'lodash'
let getAllDescriptionDepartment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Description_Department.findAll({
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                },
                raw: true,
                nest: true
            });
            // if (data && data.length > 0 && data.image) {
            //     data.map(item => {
            //         item.image = Buffer.from(item.image, 'base64').toString('binary');
            //     })
            // }
            resolve({
                errCode: 0,
                errMessage: "Data from server!",
                data: data,
            })
        } catch (e) {
            reject(e);
        }
    })
}

let handleCreateADevice = (dataDevie) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!dataDevie.name && !dataDevie.image) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameter!"
                })
            } else {

                let room = await db.Description_Department.findOrCreate({
                    where: {
                        name_location_department: dataDevie.name,
                        image: dataDevie.image
                    },
                    default: {
                        name_location_department: dataDevie.name,
                        image: dataDevie.image
                    }

                })
                if (room && room[0]) {
                    resolve({
                        errCode: 0,
                        errMessage: "Department exited !"
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: "Create Device Successfully!"
                    })
                }

            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetAllDateInfor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Temp_Wind_Value.findAll({
                raw: true,
                nest: true,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            resolve({
                errCode: 0,
                errMessage: "Data from server!",
                data
            })
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetAllInforEnergy = (date) => {
  //  console.log("hoang check data: ", date)
    return new Promise(async (resolve, reject) => {
        try {
            if (!date) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = {};
                data.dataEnergy = await db.Energy_Consumption.findAll({
                    where: { date: +date },
                    attributes: {
                        exclude: ['updatedAt', 'createdAt']
                    },
                    include: [
                        { model: db.Description_Department, as: 'departmentData', attributes: ['name_location_department', 'image'] },


                    ],
                    raw: false,
                    nest: true
                })

                // console.log("check data: ",data.departmentData);
                //

                data.dataDate = await db.Temp_Wind_Value.findOne({
                    where: { date: +date },
                    attributes: {
                        exclude: ['updatedAt', 'createdAt']
                    },

                    raw: false,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    errMessage: "Data from server!",
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetAllInforDePartment = (id) => {
  // console.log("hoang check data: ", id);
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Energy_Consumption.findAll({
                    where: {
                        department_id: id,
                    },
                    include: [
                        { model: db.Description_Department, as: 'departmentData', attributes: ['name_location_department', 'image'] },
                    ],
                    raw: false, nest: true,
                    attributes: {
                        exclude: ['updatedAt', 'createdAt']
                    },
                })
                resolve({
                    errCode: 0,
                    errMessage: "Data from server!",
                    data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllDescriptionDepartment, handleCreateADevice,
    handleGetAllDateInfor, handleGetAllInforEnergy
, handleGetAllInforDePartment
}