import React from 'react';
import { Link } from 'react-router-dom';
import { RiHome5Line } from 'react-icons/ri';
import { MdLiveTv } from 'react-icons/md';
import { BsCalendar2Date } from 'react-icons/bs';
import '../../public/css/sidebar.css'
const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`fixed z-30 bottom-0 left-0 h-full w-64 bg-white opacity-90 transform ${isSidebarOpen ? 'translate-x-0' : 'hidden translate-x-full'
        } transition-transform duration-100 ease-in-out`}>
      <ul className="p-5 mt-14 flex flex-col gap-5">
        <li className="flex justify-start items-center gap-6 hover:bg-gray-200 p-3 rounded-md">
          <RiHome5Line className="text-2xl text-black" />
          <Link to="/" className="font-semibold">
            Halaman Utama
          </Link>
        </li>
        <li className="flex justify-start items-center gap-6 hover:bg-gray-200 p-3 rounded-md">
          <MdLiveTv className="text-2xl text-black" />
          <Link to="/" className="font-semibold">
            Complete Anime
          </Link>
        </li>
        <li className="flex justify-start items-center gap-6 hover:bg-gray-200 p-3 rounded-md">
          <BsCalendar2Date className="text-2xl text-black" />
          <Link to="/" className="font-semibold">
            Jadwal Rilis
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
