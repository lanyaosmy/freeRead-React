import React, { Component } from 'react';
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import App from './App/index';
import Login from './Login';
import InitializeInfo from './InitializeInfo';

class RouteModule extends Component {
    constructor(props) {
        super(...props);
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact component={App} path="/hot" />
                    <Route exact path="/focus" component={App} />
                    <Route exact path="/edit/:type/:noteid" component={App} />
                    <Route exact path="/edit" component={App} />
                    <Route exact path="/personal" component={App} />
                    <Route exact path="/detail/:noteid" component={App} />
                    <Route exact component={Login} path="/login" />
                    <Route exact component={Login} path="/register" />
                    <Route exact component={InitializeInfo} path="/firstinfo" />

                    <Redirect from="/" to="/login" />

                </Switch>
            </HashRouter>
        );
    }
}


export default RouteModule;
