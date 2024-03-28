import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './RenderDevices.scss'
import moment from 'moment';
import _ from 'lodash'
import localization from 'moment/locale/vi';
import { withRouter } from 'react-router';
import { getAllDeviceInfor, handleGetAllDateInfor, handleGetAllInforEnergy } from '../../services/adminService'
class RenderDevices extends Component {
    state = {
        optionDate: [],
        Image: '',
        nameRoom: {},
        department: [],


    }
    async componentDidMount() {
        let { nameRoom, optionDate } = this.state;
        let resDate = await handleGetAllDateInfor();

        let dateArray = [];
        if (resDate && resDate.errCode === 0) {
            {
                resDate.data.length > 0 && resDate.data.map((item, index) => {
                    dateArray.push(item.date);
                })
            }
        }

        this.setState({
            optionDate: dateArray
        })


        let date = { ...this.state.optionDate };
        this.setState({
            ...date
        })
        await this.buildResData(date[0]);
    }

    buildResData = async (date) => {
        try {
            let response = await handleGetAllInforEnergy(date);
            console.log("check data: ", response);
            let listName = [], allInfor = {};
            if (response && response.errCode === 0) {
                {
                    response.data && response.data.dataEnergy && response.data.dataEnergy.length > 0 &&
                        response.data.dataEnergy.map(item => {
                            listName.push(item);
                        })
                }
            }

            allInfor.dataEnergy = listName;
            allInfor.dataDate = { ...response.data.dataDate };

            this.setState({
                ...this.state.nameRoom = allInfor
            })

        } catch (error) {
            console.log(error);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

        // if(prevState.nameRoom !== this.state.nameRoom){
        //   await  this.buildResData(this.state.optionDate[0]);
        // }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1, 4) + string.charAt(4).toUpperCase() + string.slice(5);
    }


    handleGetInforADepartment = (data) => {
        console.log("hoang check data: ", data);
        if (this.props.history) {
            this.props.history.push(`/system/department-manage/${data.department_id}`)
        }
    }
    render() {
        let { language } = this.props;
        let { optionDate, nameRoom, department } = this.state;

        return (
            <div className='infor-devices-container'>
                {/* <div >
                    <select className='option-date form-select'
                        onChange={(event) => { this.handleOnchangeSelect(event) }}
                    >
                        {optionDate && optionDate.length > 0 &&
                            optionDate.map((item, index) => {
                                return (
                                    <option className='option-date'
                                        key={index}
                                        value={moment.unix(item / 1000).startOf('day').valueOf()}
                                    >{this.capitalizeFirstLetter(moment(moment.unix(item / 1000).startOf('day').valueOf()).format('dddd - DD/MM'))}
                                    </option>
                                )
                            })}

                    </select>
                </div> */}
                <div className='show-devices'>
                    {
                        nameRoom && nameRoom.dataEnergy && nameRoom.dataEnergy.length > 0 &&
                        nameRoom.dataEnergy.map((item, index) => {
                            let imageBase64 = new Buffer.from(item.departmentData.image, 'base64').toString('binary');
                            return (
                                <>
                                    <div className='body-render-devices'
                                        key={index}
                                    >
                                        <div className='name-devices'
                                        >
                                            {item.departmentData.name_location_department}
                                        </div>
                                        <div className='render-image'
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                            onClick={() => this.handleGetInforADepartment(item)}
                                        >
                                        </div>
                                        <div className='render-text'>
                                            <div className='temt'>
                                                <span>
                                                    Nhiệt độ: {nameRoom.dataDate.temperature}&deg;C
                                                </span>

                                            </div>
                                            <div className='energy'>
                                                <span>Điện năng tiêu thụ: {item.energy_consumption} kWh</span>
                                            </div>
                                            <div className='speed'>
                                                <span>Độ ẩm không khí:{nameRoom.dataDate.humidy}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RenderDevices));
