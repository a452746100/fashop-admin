//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../../components/public/page'
import { getRoutes } from "../../utils";
import { Route, Switch } from "react-router-dom";
import { historyType } from "../../utils/flow";
import { dispatchProps } from "../../utils/defaultProps";
import Loadable from "react-loadable";
import { Spin } from "antd";
const UserListTable = Loadable({
    loader: () => import('../../components/user/listTable'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
type Props = {
    history: historyType,
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string }
}

@connect()
export default class List extends Component<Props, {}> {
    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <Switch>
                {routes.map((item) => {
                    return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                })}
                <Route key="/list" render={() => (
                    <Page>
                        {/*<UserListHeader {...this.props}/>*/}
                        <UserListTable {...this.props} />
                    </Page>
                )} />
            </Switch>
        )
    }
}
