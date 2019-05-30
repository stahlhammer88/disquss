import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSorting } from '../actions';
import { getTasks } from './../actions/index';

class Sortings extends Component {
    
    handleSort = name => {
        const {sortDir, page} = this.props;
        const newSortDir = sortDir === 'asc' ? 'desc' : 'asc';
        this.props.dispatch(getTasks(name, newSortDir, page));
    }

    render() {
        const sortItems = [
            {
                id: 1,
                name: 'id',
            },
            {
                id: 2,
                name: 'username',
            },
            {
                id: 3,
                name: 'email',
            },
            {
                id: 4,
                name: 'status',
            }            
        ];        
        const {sortDir, sortField} = this.props;
        return (
            <div className="sortings">
                {sortItems.map(s => (
                    <div 
                        key={s.id} 
                        onClick={() => this.handleSort(s.name)} 
                        className={`sortings__item ${(sortField === s.name) ? `selected ${sortDir}` : ''}`}>
                        {s.name}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {              
    return {
        sortField: state.sortField,        
        sortDir: state.sortDir,
        page: state.page       
    }
}

export default connect(mapStateToProps)(Sortings);