import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';

import HomeAbout from './HomeAbout'
import RenderDevices from './RenderDevices'
import ScrollToTop from "react-scroll-to-top";

function UserManage() {



    return (
        <div className=' home-page-container'>
            <ScrollToTop smooth ScrollToTop/>
            <div className='body-system' id='myBtn'>

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



                <div className='footer-system'>
                    <HomeAbout />
                </div>

            </div>

        </div>

    );
}


export default (UserManage);
