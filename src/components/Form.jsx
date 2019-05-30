import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTask } from '../actions';

class Form extends Component {    
    initialState = {       
        username: '',
        email: '',
        text: ''        
    }
    state = {...this.initialState};

    handleSubmit = e => {
        e.preventDefault();
        const dataToSubmit = {...this.state};

        this.props.dispatch(postTask({...dataToSubmit})).then(_ => this.setState({...this.initialState}));
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
    }

    render() {     
        const {name, email, text} = this.state;
        return (
            <form className="submit-form" onSubmit={e => this.handleSubmit(e)}>
                <input type="text" name="username" onChange={e => this.handleChange(e)} placeholder="Your name" value={name} />
                <input type="email" name="email" onChange={e => this.handleChange(e)} placeholder="Your email" value={email} />
                <textarea value={text} name="text" onChange={e => this.handleChange(e)} cols="30" rows="6" placeholder="Tell us something..."></textarea>
                <button type="submit">Send</button>
            </form>
        );
    }
}

const mapStateToProps = state => {          
    return {
        tasks: state.tasks,
        totalCount: state.totalCount,
        loading: state.loading,
        page: state.page
    }
}

export default connect(mapStateToProps)(Form);