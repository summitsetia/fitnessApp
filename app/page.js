import React from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

export default function Home () {
  return (
    <div className=''>
      <Navigation />
      <div className='px-12 flex justify-center'>
        <Dashboard />
      </div>
    </div>
  )
}