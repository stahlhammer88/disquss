import React, { Component } from 'react';
import { logIn } from '../actions';
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const dataToSubmit = {...this.state};

        this.props.dispatch(logIn(dataToSubmit))
    }

    render() {
        const {username, password} = this.state;
        const {token} = this.props;
        if (!token)
            return (
                <form onSubmit={e => this.handleSubmit(e)} className="auth">
                    <input value={username} onChange={e => this.handleChange(e)} type="text" name="username"/>
                    <input value={password} onChange={e => this.handleChange(e)} type="password" name="password"/>
                    <button type="submit">Login</button>
                </form>
            );
        else return (
            <div className="hello">Hello, {username}</div>
        )
    }
}

const mapStateToProps = state => {           
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Auth);