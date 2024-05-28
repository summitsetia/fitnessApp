import React from 'react';
import Image from 'next/image';

const Navigation = () => {
    return (
        <div className='flex flex-col text-black '>
            <nav className='flex fixed w-full z-10 px-12 py-12 border-b-2 border-solid bg-white items-center'>
                <div className='flex items-center'>
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={180}
                        height={150}
                        className='fixed'
                    />
                </div>
                <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8'>
                    <h1 className='text-lg font-semibold'>Dashboard</h1>
                    <h1 className='text-lg font-semibold'>Workouts</h1>
                    <h1 className='text-lg font-semibold'>Nutrition</h1>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;
