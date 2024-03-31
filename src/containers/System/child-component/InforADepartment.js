import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Layout from "./Layout";
import { handleGetAllInforDePartment, handleGetAllDateInfor, handleGetAllValuesByIdAndDate } from "../../../services/adminService"
import _ from 'lodash'
import moment from 'moment';
import localization from 'moment/locale/vi';
import './InforADepartment.scss'
import HomeAbout from '../HomeAbout'
class InforADepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionDate: [],
            imageDepartment: '',
            Energy: [],
            Temp: [],
            Humidy: [],
            Energyid: '',
            Tempid: '',
            Humidyid: '',
        }
    }
    async componentDidMount() {
        let id = this.props.match.params.id;
        await this.buildDataState();
        await this.builDataTable(id, this.state.optionDate[0]);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }


    buildDataState = async () => {
        let id = this.props.match.params.id;
        if (id && !_.isEmpty(id)) {
            let response = await handleGetAllInforDePartment(id);
            let resTempHumidy = await handleGetAllDateInfor();
            console.log("check responde 121:", response);
            let arrDate = [];
            let arrEnergy = [], arrTemp = [], arrHumidy = [];
            if (resTempHumidy && resTempHumidy.errCode == 0 && resTempHumidy.data && resTempHumidy.data.length > 0) {
                resTempHumidy.data.map((item, index) => {
                    arrTemp.push(item.temperature)
                    arrHumidy.push(item.humidy)
                })
            }
            if (arrHumidy.length > 0) {
                this.setState({
                    ...this.state.Humidy = arrHumidy,
                })
            }
            if (arrTemp.length > 0) {
                this.setState({
                    ...this.state.Temp = arrTemp,
                })
            }
            if (response && response.errCode == 0 && response.data && response.data.dataEnergy.length > 0) {
                response.data.dataEnergy.map((item, index) => {
                    arrDate.push(item.date);
                    arrEnergy.push(item.energy_consumption);
                })
            }

            if (arrDate.length > 0) {
                this.setState({
                    ...this.state.optionDate = arrDate
                })
            }
            if (arrEnergy.length > 0) {
                this.setState({
                    ...this.state.Energy = arrEnergy,
                })
            }
            if (response && response.errCode == 0 && !_.isEmpty(response.data.dataInfor)) {
                this.setState({
                    ...this.state.imageDepartment = response.data.dataInfor.image,
                })
            }
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1, 4) + string.charAt(4).toUpperCase() + string.slice(5);
    }

    builDataTable = async (id, date) => {
        let response = await handleGetAllValuesByIdAndDate(id, date)
        if (response && response.errCode === 0 && !_.isEmpty(response.data)) {
            this.setState({
                ...this.state.Energyid = response.data.dataEnergy.energy_consumption,
                ...this.state.Humidyid = response.data.dataTempHumidy.humidy,
                ...this.state.Tempid = response.data.dataTempHumidy.temperature
            })
        }
    }
    handleOnchangeSelect = async (event) => {
        console.log("check data select: ", event.target.value);
        let date = event.target.value;
        let id = this.props.match.params.id;
        await this.builDataTable(id, date);
    }
    render() {
        let { language } = this.props;
        let { optionDate, imageDepartment, Humidy, Temp, Energy, Humidyid, Tempid, Energyid } = this.state;
        let imageBase64 = new Buffer.from(imageDepartment, 'base64').toString('binary');
        return (
            <div className='extra-doctor-infor-container'>
                <div className='body'>
                    <div className='content-left'>
                        <div className='options-date'>
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
                        </div>
                        <div className=' image'
                            style={{ backgroundImage: `url(${imageBase64})` }}
                        >

                        </div>
                        <div className='infor-values-of-date'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Nhiệt độ</th>
                                        <th scope="col">Độ ẩm</th>
                                        <th scope="col">Điện năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{Tempid} °C</td>
                                        <td>{Humidyid} %</td>
                                        <td>{Math.round(Energyid * 1000) / 1000} kWh</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='content-right'>
                        <div>
                            <Layout
                                dataDate={this.state.optionDate}
                                dataEnergy={Energy}
                                dataTemp={Temp}
                                dataHumidy={Humidy}
                            />
                        </div>
                    </div>
                </div>
                <div className='footer-system'>
                    <HomeAbout />
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

export default connect(mapStateToProps, mapDispatchToProps)(InforADepartment);
