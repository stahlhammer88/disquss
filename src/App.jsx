import React from 'react';
import Form from './components/Form';
import Tasks from './components/Tasks';
import Pagination from './components/Pagination';
import Auth from './components/Auth';
import Sortings from './components/Sortings';
import './main.scss';

const App = () => {
    return (
        <div className="wrapper">
            <h1>DISQUSS</h1>
            <Auth/>
            <Form/>
            <Sortings/>
            <Tasks/>
            <Pagination/>
        </div>
    );
};

export default App;
