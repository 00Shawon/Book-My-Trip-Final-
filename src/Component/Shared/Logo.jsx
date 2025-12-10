import React from 'react';
import LogoImage from '../../assets/Logo2.png';
const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <img className='h-[60px]' src={LogoImage} alt="" />
            <h2 className='text-3xl font-bold'> <span className='text-yellow-400'>BOOK</span> My Trip</h2>
        </div>
    );
};

export default Logo;