import React, { Component } from 'react';
import { editTask } from './../actions/index';
import { connect } from 'react-redux';

class Task extends Component {
    state = {
        editing: false,
        textValue: this.props.text,
        status: this.props.status
    }

    onEditClick = () => {
        this.setState({editing: true});
    }

    handleSubmit = e => {
        e.preventDefault();
        const {id, token} = this.props;
        const {textValue: text, status} = this.state;
        const dataToSubmit = { token, id, text, status };        
        this.props.dispatch(editTask(dataToSubmit)).then(_ => 
            this.setState({editing: false})    
        );
    }

    handleChange = e => {
        this.setState({textValue: e.target.value})
    }

    handleCheck = () => {
        const {status} = this.state;
        this.setState({status: status === 0 ? 10 : 0})
    }

    render() {
        const {username, email, token} = this.props;
        const {editing, textValue, status} = this.state;
        if (!editing)
            return (
                <div className={`tasks__item ${status !== 0 && 'tasks__item--done'}`}>   
                    <div className="tasks__container">
                        <div className="tasks__username">{username}</div>
                        <div className="tasks__email">{email}</div>
                    </div>                                     
                    <div className="tasks__text">{textValue}</div>
                    { !!token && <span onClick={this.onEditClick}>Edit</span>}
                </div>
            );
        else 
        return(
            <form onSubmit={e => this.handleSubmit(e)}>
                <input type="checkbox" checked={status !== 0} onChange={this.handleCheck}/>
                <div className="tasks__username">{username}</div>
                <div className="tasks__email">{email}</div>
                <textarea name="text" onChange={e => this.handleChange(e)} value={textValue} cols="30" rows="7"></textarea>
                <button type="submit">Send</button>
            </form>
        );
    }
}

const mapStateToProps = state => {          
    return {                
        loading: state.loading,        
        token: state.token
    }
}

export default connect(mapStateToProps)(Task);