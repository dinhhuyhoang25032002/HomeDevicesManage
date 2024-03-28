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
class InforADepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionDate: [],
            imageDepartment: '',
            Energy: [],
            Temp: [],
            Humidy: [],
        }
    }
    async componentDidMount() {
        let id = this.props.match.params.id;
        await this.buildDataState();
        let response = await handleGetAllValuesByIdAndDate(id, this.state.optionDate[0])
        console.log("CHECK DATA: ", response);
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
            //  console.log("check res:", resTempHumidy);
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
        // console.log('check string:', string);
        return string.charAt(0).toUpperCase() + string.slice(1, 4) + string.charAt(4).toUpperCase() + string.slice(5);
    }
    render() {
        let { language } = this.props;
        let { optionDate, imageDepartment, Humidy, Temp, Energy } = this.state;
        let imageBase64 = new Buffer.from(imageDepartment, 'base64').toString('binary');
        //console.log("hoang check state: ", this.state);
        return (
            <div className='extra-doctor-infor-container'>
                <div className='body'>
                    <div className='content-left'>
                        <div className='options-date'>
                            <select className='option-date form-select'>
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
