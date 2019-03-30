import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './index.scss';


class Login extends React.Component {
    constructor(props) {
        super(...props);
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-panel">
                    <h3 className="login-title">Free&Read</h3>
                    <h3 className="login-intro">一起开启你的自由阅读之旅~</h3>
                    <Switch>
                        <Route exact path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <Redirect to="/login" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Login;
