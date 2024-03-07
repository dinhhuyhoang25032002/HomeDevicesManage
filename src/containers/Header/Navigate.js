import React, { Component } from 'react';
import './Navigate.scss'
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";

class Navigate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowNavigator: false
        }
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    handleChoiceOption = () => {
        this.setState({
            isShowNavigator: !this.state.isShowNavigator
        })
    }
    render() {
        let { isshowModal, isShowModalChangePassword } = this.props;
        console.log('hoang check data', isshowModal);
        return (
            <div className="topnav" >
                <div className='container'>
                    <div className='sub-item'>
                        <i className="fas fa-plus-circle"
                        ></i>
                        <NavLink to="/about-homecare">Giới Thiệu</NavLink>
                    </div>
                    <div className='sub-item'>
                        <i className="fas fa-phone"></i>
                        <NavLink to="/contact-to-admin">Liên Hệ</NavLink>
                    </div>
                    <div className='sub-item'>
                        <i className="far fa-newspaper"></i>
                        <NavLink to="/news-about-homecare">Tin Tức</NavLink>
                    </div>
                    {/* <div className='sub-item'>
                        <i className="fas fa-home"></i>
                        <a target='_blank' rel="noreferrer" href="https://www.facebook.com/profile.php?id=61555318416572&open_field=website&sk=about_contact_and_basic_info" exact>Trang Thông Tin</a>
                    </div> */}
                    <div className='sub-item'
                        onClick={() => this.handleChoiceOption()}
                    >

                        <i class="fa fa-cogs" aria-hidden="true"></i>
                        <div>Cài đặt</div>
                    </div>

                    {
                        this.state.isShowNavigator === true ?
                            <div className='setting'>
                                <div className='setting-device'
                                    onClick={isShowModalChangePassword}
                                >
                                    <i className="fas fa-user-cog"></i>
                                    <span>My Account</span>
                                </div>
                                <div className='setting-device'
                                    onClick={isshowModal}
                                >
                                    <div className='image-setting-device'>

                                    </div>
                                    <span> My Home  </span>
                                </div>
                            </div> : <></>
                    }
                </div>


                <div className='contact-information'>
                    <details open>
                        <summary>   Bản quyền 2012-2025</summary>
                        <p>Bởi công ty Homecare đăng kí.</p>
                        <p>Tất cả các thông tin, dữ liệu trên <u><b><i>www.Homecare.com</i></b></u> là chính xác và là tài sản riêng của công ty HomeCare.</p>
                        <p><b><i>Liên lạc về bản quyền.</i></b></p>
                        <p><b> Địa chỉ:</b> Số 113 Thanh Bình Mộ Lao Hà Đông Hà Nội.</p>
                        <p><b> Hotline:</b> 022-6666-9999</p>
                        <p><b>&copy; 2024 </b>HomeCare's Services.</p>
                    </details>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigate);
