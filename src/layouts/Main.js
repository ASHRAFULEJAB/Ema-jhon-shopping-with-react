import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Headers/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;