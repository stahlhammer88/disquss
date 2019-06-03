import React, { Component } from 'react';
import { editTask } from './../actions/index';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import { Zoom, Reveal, Fade } from 'react-reveal';

class Task extends Component {
    state = {
        editing: false,
        textValue: this.props.text,
        status: this.props.status,        
    }

    labelRef = React.createRef();

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
        const label = this.labelRef.current;
        label.classList.add('changing');
        this.setState({status: status === 0 ? 10 : 0}, () => {
            setTimeout(() => {
                label.classList.remove('changing');
            }, 200);           
        })        
    }

    render() {
        const {id, username, email, token} = this.props;
        const {editing, textValue, status} = this.state;         
        return (
            <Fade>
                <div className={`tasks__item ${status !== 0 && 'tasks__item--done'} ${editing ? 'tasks__item--editing' : ''}`}>   
                    <div className="tasks__container">
                        <div className="tasks__userpic">
                        <Avatar color={Avatar.getRandomColor('sitebase', ['violet'])} size={40} name={username} />
                        </div>
                        <div className="tasks__userinfo">
                            <div className="tasks__username">{username}</div>
                            <a href={`mailto:${email}`} className="tasks__email">{email}</a>
                        </div>                        
                        <span className="tasks__id">
                            {`#${id}`}
                        </span>
                    </div>                                     
                    {!editing ? <div className="tasks__text">{textValue}</div> :
                        <form className="tasks__edit-form" onSubmit={e => this.handleSubmit(e)}>
                            <input type="checkbox" id={`id_${id}`} checked={status !== 0} onChange={this.handleCheck}/>                                                    
                            <label ref={this.labelRef} htmlFor={`id_${id}`}></label>                        
                            <textarea name="text" onChange={e => this.handleChange(e)} value={textValue} cols="30" rows="4"></textarea>
                            <button type="submit" className="button-sec">Save</button>
                            <span className="link-sec link-sec--cancel" onClick={() => this.setState({editing: false})}>Cancel</span>
                        </form>                    
                    }

                    { (!!token && !editing) && <span className="link-prim link-prim--edit" onClick={this.onEditClick}>Edit</span>}
                </div>
            </Fade>
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