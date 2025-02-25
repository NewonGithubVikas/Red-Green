import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
function ClientOutlet() {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default ClientOutlet
