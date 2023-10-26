import React from 'react';
import SideBar from './_components/SideBar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className="hidden md:flex h-full w-56 flex-col fixed z-50">
        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;