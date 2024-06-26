import React, { Component } from 'react';
import { connect } from "react-redux";
// import { push } from "connected-react-router";
import { LANGUAGES } from '../utils';
import * as actions from "../store/actions";
import { FormattedMessage } from 'react-intl';
import './Login.scss';
import { withRouter } from 'react-router';
import { handleSignin } from '../services/adminService';
import { handleSignUp } from '../services/adminService'
import { toast } from 'react-toastify';
class Login extends Component {
    state = {
        signin: false,
        username: '',
        password: '',
        fullname: '',
        isShowPassword: false,
        errMessage: '',
        isShowForgotPassword: false,
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnChangeUser = (event) => {
        this.setState({
            username: event.target.value
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleForgotPassword = () => {
        this.setState({
            isShowForgotPassword: true,
            signin: false
        })
    }

    handleOnChangeFullName = (event) => {
        this.setState({
            fullname: event.target.value
        })

    }
    handleSignin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleSignin(this.state.username, this.state.password);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.adminLoginSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.errMessage
                    })
                }
            }


        }
    }

    handleKeyDown = (event) => {

        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleSignin()
        }
    }

    handleChangeStatus = () => {
        this.setState({
            signin: !this.state.signin,
            isShowForgotPassword: false,
            errMessage: ''

        })
    }

    handleSignup = async () => {
        this.setState({
            errMessage: ''
        })
        let data = {
            email: this.state.username,
            password: this.state.password,
            fullName: this.state.fullname
        }
        let response = await handleSignUp(data);
        if (response && response.errCode === 0) {
            this.setState({
                username: '',
                password: '',
                fullname: '',
            })
            toast.success("Đăng kí thành công !")
        } else {
            toast.error(response.errMessage);
        }

    }
    handleSendForgotPassword = () => {
        alert("hoang dep trai !");
    }
    render() {
        let { signin } = this.state;
        let { isLoggedIn, adminInfo } = this.props;

        return (
            <div className='extra-infor'>
                <div className='body'>
                    <div className='left-container'>
                        <div className='header-logo'>
                        </div>
                        <div className='group-item'>

                            <label className='label-title'>welcome to HomeCare</label>
                            <span className='content-introduction'> To keep connected with us please </span>
                            <span className='content-introduction'>login with your persional infor.</span>
                            {signin === false ?
                                < button className='btn-signin'
                                    onClick={() => this.handleChangeStatus()}
                                >
                                    sign in
                                </button> :
                                <button className='btn-signin'
                                    onClick={() => this.handleChangeStatus()}
                                >
                                    sign up
                                </button>
                            }
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='container'>
                            <div className=' body-right'>

                                {this.state.isShowForgotPassword === true ?
                                    <>
                                        <div className='title-right mb-3 '>
                                            Forgot Password
                                        </div>
                                        <span className='mt-3'>
                                            Please enter your email address or mobile number to search for your account
                                        </span>
                                        <div className='group-signup-input'>
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="email" className="form-control" id="floatingInput"
                                                    placeholder="name@example.com" value={this.state.username}

                                                    onChange={(event) => this.handleOnChangeUser(event)}
                                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                />
                                                <i className="fa fa-envelope" aria-hidden="true"></i>

                                                <label className='label-input' htmlFor="floatingInput">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput1"
                                                    placeholder="FullName" value={this.state.fullname}
                                                    onChange={(event) => this.handleOnChangeFullName(event)}
                                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                />
                                                <i className="fa fa-user" aria-hidden="false"></i>
                                                <label className='label-input' htmlFor="floatingInput1">FullName</label>
                                            </div>
                                        </div>
                                        <button className='btn-signup'
                                            onClick={() => this.handleSendForgotPassword()}
                                        >
                                            Send request
                                        </button>
                                    </>


                                    : <>
                                        <div className='title-right'>
                                            {signin === false ? "create acount" : "Login to your account"}
                                        </div>
                                        <div className='icon-signup'>
                                            <div className='group-signup-icon'>

                                                <div className='facebook-logo'>

                                                </div>
                                                <div className='instagram-logo'>

                                                </div>

                                            </div>
                                            <span className='type-signup'>or use your email for registration</span>

                                        </div>
                                        <div className='group-signup-input'>
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control" id="floatingInput"
                                                    placeholder="name@example.com" value={this.state.username}

                                                    onChange={(event) => this.handleOnChangeUser(event)}
                                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                />
                                                <i className="fa fa-envelope" aria-hidden="true"></i>

                                                <label className='label-input' htmlFor="floatingInput">Email address</label>
                                            </div>
                                            <div className="form-floating  mb-3">
                                                <input type={this.state.isShowPassword ? 'text' : 'password'} className="form-control"
                                                    id="floatingPassword" placeholder="Password" value={this.state.password}
                                                    onChange={(event) => this.handleOnChangePassword(event)}
                                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                />
                                                <i className="fa fa-lock" aria-hidden="true"></i>
                                                <span className='icon-isshow' onClick={() => { this.handleShowHidePassword() }}>

                                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                                </span>
                                                <label className='label-input' htmlFor="floatingPassword">Password</label>
                                            </div>



                                            {signin === false ?
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" id="floatingInput1"
                                                        placeholder="FullName" value={this.state.fullname}
                                                        onChange={(event) => this.handleOnChangeFullName(event)}
                                                        onKeyDown={(event) => { this.handleKeyDown(event) }}
                                                    />
                                                    <i className="fa fa-user" aria-hidden="false"></i>
                                                    <label className='label-input' htmlFor="floatingInput1">FullName</label>
                                                </div>
                                                :
                                                <div>
                                                </div>
                                            }

                                            <div className='group-message'>
                                                <div className='errLogin' style={{ color: 'red' }}>
                                                    {this.state.errMessage}
                                                </div>
                                                {signin === true ?
                                                    <div className='forgot-passname'>
                                                        <span
                                                            onClick={() => this.handleForgotPassword()}
                                                        >Forgot Password</span>
                                                    </div> : <></>}
                                            </div>
                                        </div>
                                        {signin === false ?
                                            <button className='btn-signup'
                                                onClick={() => this.handleSignup()}
                                            >
                                                sign up
                                            </button> :
                                            <button className='btn-signup'
                                                onClick={() => this.handleSignin()}
                                            >
                                                sign in
                                            </button>
                                        }
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>


            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.admin.isLoggedIn,
        adminInfo: state.admin.adminInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
        adminLoginSuccess: (userInfor) => dispatch(actions.adminLoginSuccess(userInfor)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
