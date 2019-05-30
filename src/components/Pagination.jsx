import React from 'react';
import { connect } from 'react-redux';
import { getTasks } from './../actions/index';
import Page from './Page';

const Pagination = props => {
    const {totalCount, page, sortField, sortDir} = props;
    const pageCount = new Array(Math.ceil(totalCount / 3)).fill(0);
    const handleClick = index => {
        if (page !== index)
            props.dispatch(getTasks(sortField, sortDir, index));
    }
    return (
        <div className="pagination">
            {pageCount.map((p, i) => {                
                return <Page handleClick={handleClick} selectedPage={page} key={i} index={i+1}/>
            })}
        </div>
    );
};

const mapStateToProps = state => {             
    return {        
        totalCount: state.totalCount,        
        page: state.page,
        sortField: state.sortField,        
        sortDir: state.sortDir
    }
}

export default connect(mapStateToProps)(Pagination);