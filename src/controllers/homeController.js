import homeService from '../services/homeService'


let getAllDescriptionDepartment = async (req, res) => {
  try {
    let data = await homeService.getAllDescriptionDepartment();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      ereMessage: "Error from server!"
    })
  }
}

let postANewDevice = async (req, res) => {
  try {
    let data = await homeService.postANewDevice(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      ereMessage: 'Error from server!'
    })
  }
}

let handleCreateADevice = async (req, res) => {
  try {
    let data = await homeService.handleCreateADevice(req.body);
    return res.status(200).json(data);
    
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      ereMessage: "Error from server!"
    })
  }
}

module.exports = {
  getAllDescriptionDepartment, postANewDevice,
  handleCreateADevice
}
