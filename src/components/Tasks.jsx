import React, { Component } from 'react';
import { getTasks} from './../actions/index';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import Task from './Task';

class Tasks extends Component {
    componentDidMount() {
        const {sortField, sortDir, page} = this.props;        
        this.props
            .dispatch(getTasks(sortField, sortDir, page))            
    }

    render() {
        const {tasks, loading} = this.props;
        if (!tasks && loading) return <ReactLoading type='spin' color="#c5c5c5" height={50} width={50} />
        if (!tasks) return null;
        return (
            <div className='tasks'>
                {tasks.map(t => (
                    <Task key={t.id} handleCheck={this.handleCheck} {...t}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {        
    return {
        tasks: state.tasks,        
        loading: state.loading,        
        token: state.token,
        page: state.page,
        sortField: state.sortField,        
        sortDir: state.sortDir
    }
}

export default connect(mapStateToProps)(Tasks);