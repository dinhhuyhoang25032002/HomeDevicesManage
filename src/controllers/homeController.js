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

let handleGetAllDateInfor = async (req, res) => {
  try {
    let data = await homeService.handleGetAllDateInfor();
    return res.status(200).json(data);

  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      ereMessage: "Error from server!"

    })
  }
}

let handleGetAllInforEnergy = async (req, res) => {
  try {
    let data = await homeService.handleGetAllInforEnergy(req.query.date);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      ereMessage: "Error from server!"
    })
  }
}

let handleGetAllInforDePartment = async (req, res) => {
  try {
    let data = await homeService.handleGetAllInforDePartment(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      ereMessage: 'Error from server!'
    })
  }
}
let handleGetAllValuesByIdAndDate = async (req, res) => {
  try {
    let data = await homeService.handleGetAllValuesByIdAndDate(req.query.id, req.query.date);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      ereMessage: 'Error from server!'
    })
  }
}
module.exports = {
  getAllDescriptionDepartment,
  handleCreateADevice, handleGetAllDateInfor,
  handleGetAllInforEnergy, handleGetAllInforDePartment,
  handleGetAllValuesByIdAndDate
}
