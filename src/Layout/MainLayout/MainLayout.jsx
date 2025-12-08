import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Component/Shared/Navbar';

const MainLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='w-11/12 mx-auto'>
                 <Outlet ></Outlet>
            </div>
           
        </div>
    );
};

export default MainLayout;