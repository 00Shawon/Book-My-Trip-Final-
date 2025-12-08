import React from 'react';
import Logo from '../../Component/Shared/Logo';
import { Outlet } from 'react-router';
import image from '../../assets/hero-section/login2.gif'

const Authlayout = () => {
    return (
        <div>
            <Logo></Logo>
            <div className='w-11/12 mx-auto'>
           <div className='flex justify-between items-center min-h-[80vh]'>
             <div>
                     <Outlet ></Outlet>
            </div>
            <div>
                <img src={image} alt="" />
            </div>
           </div>
            </div>
        </div>
    );
};

export default Authlayout;