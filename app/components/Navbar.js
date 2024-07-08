import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
    return (
        <div className='sticky top-0 text-black '>
            <nav className='flex w-full px-12 border-b-2 border-solid bg-white items-center h-'>
                <div className='items-center py-4'>
                    <Link href="/" className=''>
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={75}
                            height={75}

                        />
                    </Link>
                </div>
                <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8'>
                    <Link className='text-lg font-semibold' href="/workouts">Workouts</Link>
                    <Link className='text-lg font-semibold' href="/nutrition">Nutrition</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;