import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

export default function Home () {
  return (
    <div className='bg-[#FBFBFF]'>
      <Navbar />
      <div className='flex justify-center'>
        <Dashboard />
      </div>
    </div>
  )
}