import React, { Fragment } from 'react';
import Form from './components/Form';
import Tasks from './components/Tasks';
import Pagination from './components/Pagination';
import Auth from './components/Auth';
import Sortings from './components/Sortings';
import './main.scss';

const App = () => {
    return (
        <Fragment>
            <header className="header">
                <div className="wrapper">
                    <h1><div className="logo"></div> DIS<i>Q</i>USS</h1>
                    <Auth/>
                </div>                
            </header>
            <div className="bar">
                <div className="wrapper">
                    <Sortings/>                    
                </div>                
            </div>
            <div className="wrapper">                                                
                <Form/>
                <Tasks/>
                <Pagination/>
            </div>
            <footer className="footer"></footer>
        </Fragment>
    );
};

export default App;
