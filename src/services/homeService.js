
import db from '../models/index'

let getAllDescriptionDepartment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Description_Department.findAll();
            if (data && data.length > 0 && data.image) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                })
            }

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
                await db.Description_Department.create({
                    name_location_department: dataDevie.name,
                    image: dataDevie.image
                })
                resolve({
                    errCode: 0,
                    errMessage: "Create Device Successfully!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllDescriptionDepartment, handleCreateADevice,

}