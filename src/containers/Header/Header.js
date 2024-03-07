import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import Navigate from './Navigate';
import HomeDevicesManage from '../System/HomeDevicesManage'
import { withRouter } from 'react-router';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isshowModal: false,
        }
    }

    returnToHome = () => {
        //  let isLoggedIn = this.props
        if (this.props.history) {
            this.props.history.push(`/system/home-devices-manage`)
        }
        this.setState({
            isShow: false,
        });
    }
    showMenuApp = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    closeModalDoctorSchedule = () => {
        this.setState({
            isshowModal: false
        })
    }

    handleIsShowModal = () => {
        this.setState({
            isshowModal: true
        })
    }
    render() {
        const { processLogout, adminInfo } = this.props;
        let { isShow, isshowModal } = this.state;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                {/* <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div> */}

                <div className='home-header-content'>
                    <div className='left-content'>
                        <div className='center-i'
                            onClick={() => { this.showMenuApp() }} >
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className='location-header'>
                            <div className='header-logo'
                                onClick={() => { this.returnToHome() }}
                            >
                            </div>
                        </div>

                    </div>
                    <div className='center-content'>
                        <div className='get-enery sub-item'>

                            <div className='collect'>
                                <i class="fa fa-bolt" aria-hidden="true"></i>
                                <span> Điện năng tiêu thụ</span>
                            </div>
                        </div>
                        <div className='get-temperature sub-item'>
                            <div className='collect'>
                                <i class="fa fa-thermometer-half" aria-hidden="true"></i>
                                <span> Nhiệt độ</span>
                            </div>
                        </div>
                        <div className='get-humidity sub-item'>
                            <div className='collect'>
                                <i class="fa fa-snowflake" aria-hidden="true"></i>
                                <span> Độ ẩm</span>
                            </div>

                        </div>
                        <div className='get-humidity sub-item'>
                            <div className='collect'>
                                <i class="fa fa-phone" aria-hidden="true"></i>
                                <i class='bx bxs-phone-outgoing'></i>
                                <span>Hỗ trợ</span>
                            </div>

                        </div>
                    </div>
                    <div className='right-content'>
                        <span className='welcome'>Xin chào, {adminInfo && adminInfo.firstName && adminInfo.lastName ? adminInfo.firstName + ' ' + adminInfo.lastName : ''} !</span>
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                    {isShow === true ?
                        <>
                            <div className='top-nav'>
                                <Navigate
                                    isshowModal={this.handleIsShowModal}
                                />

                                <div className='over-dark'
                                    onClick={() => { this.showMenuApp() }}
                                >


                                </div>
                            </div>

                        </>
                        :
                        <>
                        </>
                    }
                      {
                              isshowModal === true ?

                                    <HomeDevicesManage
                                        isshowModal={isshowModal}
                                        closeModalDoctorSchedule={this.closeModalDoctorSchedule}
                                    />
                                    :
                                    <div>
                                    </div>

                            }

                </div>

                {/* nút logout */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        adminInfo: state.admin.adminInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
