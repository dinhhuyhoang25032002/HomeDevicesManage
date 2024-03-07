import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import './HomeDevicesManage.scss'
import { CommonUtils } from '../../utils'
import MarkdownIt from 'markdown-it';
import { handleCreateADevice } from '../../services/adminService'
import Lightbox from 'react-image-lightbox';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class HomeDevicesManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updateImage: '',
            avatar: '',
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false
        }
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
            isOpen: true
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
    render() {
        let { isshowModal, closeModalDoctorSchedule } = this.props;


        return (
            <>
                <Modal
                    isOpen={isshowModal}
                    toggle={closeModalDoctorSchedule}
                    className='bookingcare-modal-container'
                    centered
                    size='lg'
                >
                    <div className='container-modal'>
                        <div className='body-modal'>
                            <div className='logo-system'>

                            </div>
                            <div className='content-modal row'>

                                <div className="text-center title-modal" >Home Devices Manage</div>
                                <div className='infor-devices row'>
                                    <div className='left-infor'>
                                        <div class=" mb-3  input-group ">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                            </span>
                                            <input type="text" className="form-control" placeholder="Tên phòng" aria-describedby="basic-addon1"
                                                value={this.state.name}
                                                onChange={(event) => this.handleOnChange(event)}
                                            />
                                        </div>
                                        <div class=" mb-3  input-group ">
                                            <span className="input-group-text" id="basic-addon2">
                                                <i class="fa fa-cogs" aria-hidden="true"></i>
                                            </span>
                                            <input type="text" className="form-control col-4" placeholder="Tên thiết bị" aria-describedby="basic-addon1" />
                                        </div>
                                        <div class=" mb-3  input-group ">
                                            <span className="input-group-text" id="basic-addon3">
                                                <i class="fa fa-tags" aria-hidden="true"></i>
                                            </span>
                                            <input type="text" className="form-control col-4" placeholder="Miêu tả" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className='right-infor'>
                                        <div className='update-avatar'>
                                            <input id='update-image1' className="form-control" type="file" hidden
                                                onChange={(event) => { this.handleUpdateImage(event) }}
                                            />

                                            <label className='label-update' htmlFor="update-image1"> Tải ảnh<i class="fa fa-file-image" aria-hidden="true"></i></label>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeDevicesManage);
