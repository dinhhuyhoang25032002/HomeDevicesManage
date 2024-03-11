import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
// import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import InforADepartment from '../containers/System/child-component/InforADepartment'
class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/home-devices-manage" component={UserManage} />
                        <Route path="/system/department-manage/:id" component={InforADepartment} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />

                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
