import React, { useEffect, useState } from 'react'
import { FaAlignJustify, FaRegEnvelope, FaSlash, FaAd } from "react-icons/fa";
import { SlDiamond } from "react-icons/sl";
import { FiDownload, FiUpload, FiBookmark, FiSearch, FiGlobe } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { IoIosArrowForward, IoMdDownload } from "react-icons/io";
import { RiErrorWarningLine, RiHdLine } from "react-icons/ri";
import { BsChatSquare } from "react-icons/bs";
import { MdOutlineLogout, MdDevices } from "react-icons/md";
import { PiFilmReelThin, PiFireBold } from "react-icons/pi";
import { useLocation, useNavigate } from 'react-router';
import HamburgerIcon from './HamburgerIcon';
import { Link } from 'react-router-dom';

const Navbar = ({ isScrolled, setIsScrolled }) => {
    const [search, setSearch] = useState('')
    // const [searchHistory, setSearchHistory] = useState([])
    const location = useLocation()
    const isLandingPage = location.pathname === '/';
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if(search.trim()){
            navigate(`/search/${encodeURIComponent(search)}`)
            // setSearchHistory([...searchHistory, search])
            
        }
    }

    useEffect(() => {
        if (!isLandingPage) return;
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isLandingPage, setIsScrolled])


    return (
        <header className={`navbar w-full h-16  flex p-5 justify-between items-center z-50 top-0   ${isLandingPage ? 'fixed' : ''} transition-colors duration-300 ${isScrolled && isLandingPage ? 'bg-base-100 shadow-md' : isLandingPage ? 'bg-transparent' : 'bg-base-100 shadow-md'}`} > {/* Left section */}
            <Link to={'/'}>
                <div className='flex items-center gap-6'>
                    <img src="/image/bstation.svg" alt="" className='w-24 sm:w-36' />
                </div>
            </Link>

            {/* Search section */}
            <form onSubmit={handleSearchSubmit} className='flex w-1/2 lg:w-[35rem] items-center justify-center shadow-sm mx-4 sm:mx-0'>
                <div className='bg-base-300 h-10 flex justify-center items-center rounded-l-md p-2 '>
                    <FiSearch size={14}
                        className='' />
                </div>
                <input className='w-full h-10 rounded-r-md bg-base-300 focus:outline-none focus:ring-0 focus:border-none outline-none ring-0 border-none' 
                type="text" 
                placeholder='Cari'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                 />
            </form>

            <div className='flex justify-center items-center gap-8'>

                <div className={`hidden lg:flex justify-center items-center gap-1 p-2 ${isScrolled ? 'bg-base-300' : 'bg-gray-200 text-black'} rounded-md w-24 h-8`}>
                    <FiDownload size={14} />
                    <p className={`text-[0.8em] `} >Aplikasi</p>
                </div>

                {/* Premium */}

                {/* profile */}
                <div className='relative dropdown dropdown-hover'>
                    <div tabIndex={0} role='button'>
                        <img src="/image/pp.jpg" className='w-8 h-8 rounded-full border border-gray-600 cursor-pointer' alt="" />
                    </div>
                    {/* dropdown profile */}
                    <div className='dropdown-content menu absolute  -left-[26rem] z-[1] bg-base-100 rounded- shadow-md w-[28rem] h-fit ' tabIndex={0}>
                        <div className='flex gap-3 justify-normal items-center mb-5 px-6 pt-6'>
                            <img src="/image/pp.jpg" className='w-10 h-10 rounded-full border border-gray-600' alt="" />
                            <h4 className=' font-bold font-sans text-lg '>Didin_Zakaria</h4>
                        </div>
                        <hr className='border-gray-300 pb-2' />
                        <div className='px-1 py-4 flex flex-col justify-center gap-4'>
                            <div className='flex justify-between items-center hover:bg-base-300 rounded-md py-2 cursor-pointer'>
                                <div className='flex justify-normal items-center gap-3 px-6'>
                                    <FaRegEnvelope size={20} />
                                    <h4>Pemberitahuan Sistem</h4>
                                </div>
                                <div className='px-2'>
                                    <IoIosArrowForward size={20} />
                                </div>
                            </div>
                            <div className='flex justify-between items-center hover:bg-base-300 rounded-md py-2 cursor-pointer'>
                                <div className='flex justify-normal items-center gap-3 px-6'>
                                    <RiErrorWarningLine size={20} />
                                    <h4>Profil Saya</h4>
                                </div>
                            </div>
                            <div className='flex justify-between items-center hover:bg-base-300 rounded-md py-2 cursor-pointer'>
                                <div className='flex justify-normal items-center gap-3 px-6'>
                                    <FiUpload size={20} />
                                    <h4>Pusat Kreator</h4>
                                </div>
                            </div>
                            <div className='flex justify-between items-center hover:bg-base-300 rounded-md py-2 cursor-pointer'>
                                <div className='flex justify-normal items-center gap-3 px-6'>
                                    <FiGlobe size={18} />
                                    <h4>Bahasa: Bahasa Indonesia</h4>
                                </div>
                                <div className='px-2'>
                                    <IoIosArrowForward size={20} />
                                </div>
                            </div>
                            <div className='flex justify-between items-center hover:bg-base-300 rounded-md py-2 cursor-pointer'>
                                <div className='flex justify-normal items-center gap-3 px-6'>
                                    <BsChatSquare size={17} />
                                    <h4>Pengiriman Feedback</h4>
                                </div>
                            </div>
                        </div>
                        <hr className='border-gray-300 pb-2' />
                        <div className="py-4">
                            <div className='flex justify-between items-center hover:bg-base-300 rounded-md py-2 cursor-pointer'>
                                <div className='flex justify-normal items-center gap-3 px-6'>
                                    <MdOutlineLogout size={20} />
                                    <h4>Logout</h4>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </header>)
}

export default Navbar;

