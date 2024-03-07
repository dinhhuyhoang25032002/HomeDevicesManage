import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './RenderDevices.scss'
class RenderDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }


    render() {

        let { language } = this.props;
        console.log("hoang check state: ", this.state)
        return (
            <div className='infor-devices-container'>
                <div className='show-devices'>
                    <div className='body-render-devices'>
                        <div className='name-devices'>
                            Phòng khách
                        </div>
                        <div className='render-image'>

                        </div>
                        <div className='render-text'>
                            <div className='temt'>
                                Nhiệt độ:<br></br>  36.5&deg;C
                                
                            </div>
                            <div className='energy'>
                                Điện năng tiêu thụ: 2 kWh
                            </div>
                            <div className='speed'>
                                Độ ẩm: 96%
                            </div>
                        </div>
                    </div>
                    <div className='body-render-devices'>
                        <div className='name-devices'>
                            Phòng ngủ
                        </div>
                        <div className='render-image'>

                        </div>
                        <div className='render-text'>

                        </div>
                    </div>
                    <div className='body-render-devices'>
                        <div className='name-devices'>
                            Hầm rượu
                        </div>
                        <div className='render-image'>

                        </div>
                        <div className='render-text'>

                        </div>
                    </div>
                    <div className='body-render-devices'>
                        <div className='name-devices'>
                            Hầm để ô tô
                        </div>
                        <div className='render-image'>

                        </div>
                        <div className='render-text'>

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

export default connect(mapStateToProps, mapDispatchToProps)(RenderDevices);
