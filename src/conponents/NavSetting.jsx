import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import calendarIcon from '../imgs/calendarIcon.png';
import timerIcon from '../imgs/timerIcon.png';
import searchIcon from '../imgs/searchIcon.png';
import logOutIcon from '../imgs/logout.png';

export default function NavSetting({ handleSearch }) {
  const [logout, setLogout] = useState(false);

  return (
    <div className="absolute left-0 top-0 translate-x-[-100%] hover:translate-x-[0] transition-all border-2 flex h-full flex-col items-center p-2 bg-white shadow-md z-50">
      <div className="mb-4">
        <div className="setting-item rounded-full w-12 h-12 flex items-center justify-center bg-blue-400">
          <Link to="/todos" className="text-white text-xl font-bold">T</Link>
        </div>
      </div>
      <div className="mb-4">
        <div className="setting-item rounded-full w-12 h-12 flex items-center justify-center bg-yellow-400">
          <Link to="/todos/calendar">
            <img src={calendarIcon} alt="Calendar" className="w-6 h-6 object-cover" />
          </Link>
        </div>
      </div>
      <div className="mb-4">
        <div className="setting-item rounded-full w-12 h-12 flex items-center justify-center bg-green-400">
          <Link to="/todos/timer">
            <img src={timerIcon} alt="Timer" className="w-6 h-6 object-cover" />
          </Link>
        </div>
      </div>
      <div className="mb-4">
        <div className="setting-item rounded-full w-12 h-12 flex items-center justify-center bg-red-400 cursor-pointer" onClick={handleSearch}>
          <img src={searchIcon} alt="Search" className="w-6 h-6 object-cover" />
        </div>
      </div>
      <div className="mt-auto">
        <div
          className="setting-item rounded-full w-12 h-12 flex items-center justify-center bg-purple-400 cursor-pointer"
          onClick={() => {
            sessionStorage.removeItem('user');
            window.location.reload();
          }}
        >
          <img src={logOutIcon} alt="Logout" className="w-6 h-6 object-cover" />
          {logout && <Navigate to={'/'} />}
        </div>
      </div>
         <div className='absolute top-[50%]  left-[40%] bg-white h-[5vw] w-[5vw] rounded-full flex justify-end items-center  border-r-2  font-bold text-xl  p-2'>  > </div>
    </div>
  );
}
