import React from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../actions/index';

const Header = ({ auth, authenticate }) => {
    const handleLogin = () => {
        console.log('clicked!');
        authenticate(auth);
    }

    return (
        <div className="ui secondary pointing menu">
            <a className="active item" href="/">
                Home
            </a>
            <a className="item" href="/">
                Messages
            </a>
            <a className="item" href="/">
                Friends
            </a>
            <div className="right menu">
                <a className="ui item" onClick={handleLogin}>
                    Logout
                </a>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

export default connect(mapStateToProps, {
    authenticate: authenticate
})(Header);