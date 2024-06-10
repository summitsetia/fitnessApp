import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Navigation = () => {
    return (
        <div className='flex flex-col text-black '>
            <nav className='flex fixed w-full z-10 px-12 py-12 border-b-2 border-solid bg-white items-center'>
                <div className='flex items-center'>
                    <Link href="/" className='fixed'>
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={180}
                            height={150}
                            
                        />
                    </Link>
                </div>
                <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8'>
                    <h1 className='text-lg font-semibold'>Workouts</h1>
                    <Link className='text-lg font-semibold' href="/nutrition">Nutrition</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;
