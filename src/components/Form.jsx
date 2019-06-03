import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { postTask } from '../actions';
import {validate} from 'email-validator';
import { Fade } from 'react-reveal';

class Form extends Component {    
    initialState = {       
        data: {
            username: this.props.token ? 'admin' : '',
            email: '',
            text: '',            
        },
        emailError: false,
        opened: false,
        rollup: false
    }
    state = {...this.initialState};

    handleSubmit = e => {
        e.preventDefault();
        const {email} = this.state.data;          
        if (validate(email)) {
            const dataToSubmit = {...this.state.data};
            this.props.dispatch(postTask({...dataToSubmit})).then(_ => this.setState({...this.initialState}));
        }        
        else {
            this.setState({emailError: true});
        }
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;        
        this.setState({data: {...this.state.data, [name]: value}, emailError: false});
    }

    rollFormUp = () => {
        this.setState({rollup: true}, () => {
            setTimeout(() => this.setState({               
                rollup: false,
                opened: false                
            }), 300)
        })
    }

    render() {     
        const {data: {name, email, text}, emailError, opened, rollup} = this.state;
        const {token} = this.props;       
        return (
            <Fragment>
                <div className="button-add-task" onClick={()=> this.setState({opened: true})}>Add New Task</div>
                {opened && (
                    <form className={`submit-form ${rollup ? 'rollup' : ''}`} onSubmit={e => this.handleSubmit(e)}>
                        <h2>Adding a new task</h2>
                        {
                            token ?
                            <div className="submit-form__logged-user">admin</div> :
                            <input type="text" name="username" onChange={e => this.handleChange(e)} placeholder="Your name" value={name} />
                        }            
                        {emailError && <Fade bottom><div className="input-error">Please enter a valid email</div></Fade>}            
                        <input type="email" name="email" onChange={e => this.handleChange(e)} placeholder="Your email" value={email} />
                        <textarea value={text} name="text" onChange={e => this.handleChange(e)} cols="30" rows="6" placeholder="Tell us something..."></textarea>
                        <button type="submit" className="button-prim">Send</button>
                        <span className="link-prim link-prim--cancel" onClick={this.rollFormUp}>Cancel</span>
                    </form>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {          
    return {        
        token: state.token
    }
}

export default connect(mapStateToProps)(Form);