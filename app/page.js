import React from 'react';
import Navigation from './components/Navigation';
import Dashbooard from './components/Dashboard';

export default function Home () {
  return (
    <div className='bg-white'>
      <Navigation />
      <Dashbooard />
    </div>
  )
}