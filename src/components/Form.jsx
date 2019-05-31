import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { postTask } from '../actions';
import {Fade} from 'react-reveal';

class Form extends Component {    
    initialState = {       
        username: '',
        email: '',
        text: '',
        opened: false,
        rollup: false
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

    rollFormUp = () => {
        this.setState({rollup: true}, () => {
            setTimeout(() => this.setState({
                rollup: false,
                opened: false
            }), 300)
        })
    }

    render() {     
        const {name, email, text, opened, rollup} = this.state;
        return (
            <Fragment>
                <div className="button-add-task" onClick={()=> this.setState({opened: true})}>Add New Task</div>
                {opened && (
                    <form className={`submit-form ${rollup ? 'rollup' : ''}`} onSubmit={e => this.handleSubmit(e)}>
                        <h2>Adding a new task</h2>
                        <input type="text" name="username" onChange={e => this.handleChange(e)} placeholder="Your name" value={name} />
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
        tasks: state.tasks,
        totalCount: state.totalCount,
        loading: state.loading,
        page: state.page
    }
}

export default connect(mapStateToProps)(Form);