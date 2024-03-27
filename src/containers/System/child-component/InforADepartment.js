import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Layout from "./Layout";
import { Data } from './Data';
import { handleGetAllInforDePartment } from "../../../services/adminService"
import _ from 'lodash'
import moment from 'moment';
import localization from 'moment/locale/vi';
import './InforADepartment.scss'
class InforADepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionDate: []
        }
    }
    async componentDidMount() {
        let id = this.props.match.params.id;

        if (id && !_.isEmpty(id)) {
            let response = await handleGetAllInforDePartment(id);
            console.log("check res:", response);
            let arrDate = [];
            if (response && response.errCode == 0 && response.data.length > 0) {
                response.data.map((item, index) => {
                    arrDate.push(item.date);
                })
            }
            if (arrDate.length > 0) {
                this.setState({
                    ...this.state.optionDate = arrDate
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    capitalizeFirstLetter = (string) => {
        console.log('check string:', string);
        return string.charAt(0).toUpperCase() + string.slice(1, 4) + string.charAt(4).toUpperCase() + string.slice(5);
    }
    render() {
        let { language } = this.props;
        let { optionDate } = this.state;
        console.log("hoang check state: ", optionDate)
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
                        <div className=' image'>

                        </div>
                        <div className='infor-values-of-date'>

                        </div>
                    </div>
                    <div className='content-right'>
                        <div>
                            <Layout data={Data}
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
