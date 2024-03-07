import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import Slider from 'react-slick';
import HomeAbout from './HomeAbout'
import RenderDevices from './RenderDevices'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        let { imageArray } = this.state;
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3,

        };
        return (
            <div className=' home-page-container'>

                <div className='body-system'>

                    <div className='content-system'>
                        <div className='group-item' >
                            <div className='image'
                                style={{ backgroundImage: `url(${"../../assets/images/Kitchen.png"})` }}>
                            </div>
                        </div>



                    </div>

                    <div className="render-center">
                        < RenderDevices />

                    </div>


                    <div className='contact'>
                        <div className='logo-messenger'>

                        </div>
                        <div className='logo-zalo'>

                        </div>
                    </div>

                    <div className='footer-system'>
                        <HomeAbout />
                    </div>
                </div>

            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
