import React, { Component, Fragment } from 'react';
import { logIn, logOut } from '../actions';
import { connect } from 'react-redux';
import {Fade} from 'react-reveal';

class Auth extends Component {
    state = {
        username: '',
        password: '',        
        isOpened: false
    }

    
    componentWillMount() {
        const token = localStorage.getItem('token');        
        if(token) 
            this.props.dispatch(logIn(null, null, token));
    }
    

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const {username, password} = this.state;

        this.props.dispatch(logIn(username, password, null))
            .then(res => localStorage.setItem('token', this.props.token))
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logOut());
    }

    render() {
        const {username, password, opened} = this.state;
        const {token} = this.props;       
        if (!token)
            return (
                <Fragment>
                    <div className="auth-buttons">
                        <span className="auth-buttons__sign-in" onClick={() => this.setState({opened: true})}>Sign In</span>
                        or
                        <span className="button-prim">Sign Up</span>                        
                    </div>
                    {opened && (
                        <Fade bottom duration={300}>
                            <form onSubmit={e => this.handleSubmit(e)} className="auth">
                                <h2>Haven't We Met Before?</h2>
                                <input value={username} onChange={e => this.handleChange(e)} type="text" name="username"/>
                                <input value={password} onChange={e => this.handleChange(e)} type="password" name="password"/>
                                <button type="submit" className="button-prim">Sign In</button>
                                <span className="link-prim link-prim--cancel" onClick={() => this.setState({opened: false})}>Cancel</span>
                            </form>
                        </Fade>
                    )}
                </Fragment>
            );
        else return (
            <div className="hello">Hello, admin <div className="hello__logout" onClick={this.handleLogout}></div></div>
        )
    }
}

const mapStateToProps = state => {           
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Auth);