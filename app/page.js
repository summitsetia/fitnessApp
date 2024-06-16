import React from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

export default function Home () {
  return (
    <div className='bg-[#FBFBFF]'>
      <Navigation />
      <div className='flex justify-center'>
        <Dashboard />
      </div>
    </div>
  )
}