import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminOutlet = () => {
  return (
    <div>
      {/* Admin specific content like sidebar (optional) */}
      
      <Outlet />
    </div>
  );
};

export default AdminOutlet;
