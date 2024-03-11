import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import './HomeDevicesManage.scss'
import { CommonUtils } from '../../utils'
import MarkdownIt from 'markdown-it';
import { handleCreateADevice } from '../../services/adminService'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { handleChangePassword } from '../../services/adminService'
const mdParser = new MarkdownIt(/* Markdown-it options */);
class HomeDevicesManage extends Component {

    state = {
        updateImage: '',
        avatar: '',
        name: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        isOpen: false,
        username: '',
        password: '',
        errMessage: ''
    }


    componentDidMount() {
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleUpdateImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            // console.log('chech data image: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                updateImage: objectUrl,
                avatar: base64
            })
        }
    }
    handlePreviewImage = () => {
        if (!this.state.updateImage) return;
        this.setState({
            isOpen: true,
            isShowPassword: false,
        })
    }
    handleOnChangeRePass = (event) => {
        let { newpassword } = this.state;
        if (newpassword.length <= 4) {
            toast.warn('Độ dài mật khẩu quá ngắn!');
        }
        this.setState({
            repassword: event.target.value
        })

    }
    handleOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleCreateDevice = async () => {


        let data = {
            name: this.state.name,
            image: this.state.avatar
        }
        console.log("hoang check data: ", data);
        let response = await handleCreateADevice(data);
        if (response && response.errCode === 0) {
            toast.success("Bạn đã tạo thành công !");
        } else {
            toast.error(response.errMessage);
        }

    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleChangePassword()
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleOnChangeUser = (event) => {
        this.setState({
            username: event.target.value
        })

    }
    handleOnChangePassword = (event) => {

        this.setState({
            newpassword: event.target.value
        })

    }
    handleChangePassword = async () => {
        let { username, newpassword, repassword } = this.state;
        let data = {
            email: username,
            newpassword: newpassword
        }

        if (newpassword === repassword) {

            let response = await handleChangePassword(data);
            if (response && response.errCode === 0) {
                this.props.handleCloseModal();
                this.props.showMenuApp();
                toast.success('Thay đổi mật khẩu thành công!');
            }
            else if (response && response.errCode === -2) {
                toast.warn(response.errMessage);
            }
        } else {

            toast.error('Mật khẩu nhập không trùng khớp!');
        }


    }
    render() {
        let { isshowModal, handleCloseModal, isShowModalChangePassword } = this.props;


        return (
            <>
                <Modal
                    isOpen={isshowModal}
                    toggle={handleCloseModal}
                    className='bookingcare-modal-container'
                    centered
                    size='lg'
                >
                    <div className='container-modal'>
                        <div className='body-modal'>
                            <div className='logo-system'>

                            </div>
                            {
                                isshowModal === true ?
                                    <> {
                                        isShowModalChangePassword === true ?
                                            <div className='content-modal row'>

                                                <div className="text-center title-modal" >Change your password</div>
                                                <div className='group-signup-input'>
                                                    <div className="form-floating mb-3">
                                                        <input type="email" className="form-control" id="floatingInput"
                                                            placeholder="name@example.com" value={this.state.username}

                                                            onChange={(event) => this.handleOnChangeUser(event)}
                                                            onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                        />
                                                        <i className="fa fa-envelope" aria-hidden="true"></i>

                                                        <label className='label-input' htmlFor="floatingInput">Địa chỉ email</label>
                                                    </div>
                                                    <div className="form-floating  mb-3">
                                                        <input type={this.state.isShowPassword ? 'text' : 'password'} className="form-control"
                                                            id="floatingPassword" placeholder="Password" value={this.state.newpassword}
                                                            onChange={(event) => this.handleOnChangePassword(event)}
                                                            onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                        />
                                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                                        <span className='icon-isshow' onClick={() => { this.handleShowHidePassword() }}>

                                                            <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                                        </span>
                                                        <label className='label-input' htmlFor="floatingPassword">Mật khẩu mới</label>
                                                    </div>

                                                    <div className="form-floating  mb-3">
                                                        <input type={this.state.isShowPassword ? 'text' : 'password'} className="form-control"
                                                            id="floatingPassword" placeholder="Password"
                                                            value={this.state.repassword}
                                                            onChange={(event) => this.handleOnChangeRePass(event)}
                                                            onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                        />
                                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                                        <span className='icon-isshow' onClick={() => { this.handleShowHidePassword() }}>

                                                            <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                                        </span>
                                                        <label className='label-input' htmlFor="floatingPassword">Nhập lại mật khẩu</label>
                                                    </div>


                                                    <div className='errLogin' style={{ color: 'red' }}>
                                                        {this.state.errMessage}
                                                    </div>
                                                    <div className='footer-change-password'>
                                                        <button className='btn-change-password'
                                                            onClick={() => { this.handleChangePassword() }}
                                                        >
                                                            Đổi mật khẩu
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                            :
                                            <div className='content-modal row'>

                                                <div className="text-center title-modal" >Home Devices Manage</div>
                                                <div className='infor-devices row'>
                                                    <div className='left-infor'>
                                                        <div className=" mb-3  input-group ">
                                                            <span className="input-group-text" id="basic-addon1">
                                                                <i className="fa fa-address-book" aria-hidden="true"></i>
                                                            </span>
                                                            <input type="text" className="form-control" placeholder="Tên phòng" aria-describedby="basic-addon1"
                                                                value={this.state.name}
                                                                onChange={(event) => this.handleOnChange(event)}
                                                            />
                                                        </div>
                                                        <div className=" mb-3  input-group ">
                                                            <span className="input-group-text" id="basic-addon2">
                                                                <i className="fa fa-cogs" aria-hidden="true"></i>
                                                            </span>
                                                            <input type="text" className="form-control col-4" placeholder="Tên thiết bị" aria-describedby="basic-addon1" />
                                                        </div>
                                                        <div className=" mb-3  input-group ">
                                                            <span className="input-group-text" id="basic-addon3">
                                                                <i className="fa fa-tags" aria-hidden="true"></i>
                                                            </span>
                                                            <input type="text" className="form-control col-4" placeholder="Miêu tả" aria-describedby="basic-addon1" />
                                                        </div>
                                                    </div>
                                                    <div className='right-infor'>
                                                        <div className='update-avatar'>
                                                            <input id='update-image1' className="form-control" type="file" hidden
                                                                onChange={(event) => { this.handleUpdateImage(event) }}
                                                            />

                                                            <label className='label-update' htmlFor="update-image1"> Tải ảnh<i className="fa fa-file-image" aria-hidden="true"></i></label>
                                                            <div className='preview-image'
                                                                style={{ backgroundImage: `url(${this.state.updateImage})` }}
                                                                onClick={() => { this.handlePreviewImage() }}
                                                            >
                                                            </div>
                                                        </div>
                                                        <div>

                                                        </div>

                                                    </div>


                                                </div>
                                                <div className='footer-modal'>
                                                    <button className='btn btn-primary'
                                                        onClick={() => this.handleCreateDevice()}
                                                    >
                                                        Thêm mới
                                                    </button>
                                                    <button className='btn btn-success'>
                                                        Chỉnh sửa
                                                    </button>
                                                </div>
                                            </div>
                                    }</>
                                    :
                                    <>
                                    </>
                            }


                        </div>

                    </div>

                </Modal>

            </>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDevicesManage));
