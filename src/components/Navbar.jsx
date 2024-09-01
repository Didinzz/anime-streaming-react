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
import { useLocation } from 'react-router';
import HamburgerIcon from './HamburgerIcon';
import { Link } from 'react-router-dom';

const Navbar = ({ isScrolled, setIsScrolled}) => {
    // const [isProvile, setisProvile] = useState(false);
    const location = useLocation()
    const isLandingPage = location.pathname === '/';

    useEffect(() => {
        if(!isLandingPage) return;
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
        <header className={`navbar w-full h-16  flex p-5 justify-between items-center z-50 top-0  ${isLandingPage ? 'fixed' : ''} transition-colors duration-300 ${isScrolled && isLandingPage ? 'bg-base-100' : isLandingPage ? 'bg-transparent' : 'bg-base-100'}`} > {/* Left section */}
        <Link to={'/'}>
            <div className='flex items-center gap-6'>
                {/* <HamburgerIcon isLandingPage={isLandingPage} isScrolled={isScrolled} isSidebarOpen={isSidebarOpen} setisSidebarOpen={setisSidebarOpen}/> */}
                <img src="/image/bstation.svg" alt="" className='' />
            </div>
        </Link>

            {/* Search section */}
            <div className='flex w-[35rem] items-center justify-center shadow-sm'>
                <div className='bg-base-300 h-10 flex justify-center items-center rounded-l-md p-2 '>
                    <FiSearch size={14}
                        className='' />
                </div>
                <input className='w-full h-10 rounded-r-md bg-base-300 focus:outline-none focus:ring-0 focus:border-none outline-none ring-0 border-none' type="text" placeholder='Cari' />
            </div>

            <div className='flex justify-center items-center gap-8'> 

                <div className={`hidden sm:flex justify-center items-center gap-1 p-2 ${isScrolled ? 'bg-base-300' : 'bg-gray-200 text-black'} rounded-md w-24 h-8`}>
                    <FiDownload size={14} />
                    <p className={`text-[0.8em] `} >Aplikasi</p>
                </div>

                {/* Premium */}
                <div className='hidden sm:flex justify-center items-center bg-[#FF4A80] rounded-md w-28 h-8 relative dropdown dropdown-hover '>
                    <div className='flex justify-center items-center gap-2 cursor-pointer' tabIndex={1}>
                        <SlDiamond size={14}
                            className='text-white' />
                        <p className='text-white text-sm'>Premium</p>
                    </div>
                    {/* dropdown premium */}
                        <div className=' absolute top-8 -left-[17rem] bg-base-100 rounded-md shadow-md w-[28rem] h-fit dropdown-content menu' tabIndex={0}>
                            <div className='p-6 flex justify-between items-center' >
                            <h3 className='font-bold  text-[1.1em]'>Ketuntungan Premium</h3>
                                <IoIosArrowForward size={20} />
                            </div>
                            <div className='flex flex-col gap-5 px-6 mb-6'>
                                <div className=' gap-2 flex justify-normal items-center cursor-pointer'>
                                    <PiFilmReelThin size={25} />
                                    <h4 className='font-sans text-[1em]'>Kontent Premium</h4>
                                </div>
                                <div className=' gap-2 flex justify-normal items-center cursor-pointer'>
                                    <PiFireBold size={23} />
                                    <h4 className='font-sans text-[1em]'>Lebih Awal</h4>
                                </div>
                                <div className=' gap-2 flex justify-normal items-center cursor-pointer'>
                                    <RiHdLine size={23} />
                                    <h4 className='font-sans text-[1em]'>Resolusi HD</h4>
                                </div>
                                <div className=' gap-2 flex justify-normal items-center cursor-pointer'>
                                    <MdDevices size={23} />
                                    <h4 className='font-sans text-[1em]'>Multi perangkat</h4>
                                </div>
                                <div className=' gap-2 flex justify-normal items-center cursor-pointer'>
                                    <IoMdDownload size={23} />
                                    <h4 className='font-sans text-[1em]'>Gratis unduh</h4>
                                </div>
                                <div className=' gap-2 flex justify-normal items-center cursor-pointer'>
                                    <div className='relative'>
                                        <FaAd size={23} />
                                        <FaSlash size={23} className='absolute top-0 left-0 text-sm font-extralight' />
                                    </div>
                                    <h4 className='font-sans text-[1em]'>Lewati iklan</h4>
                                </div>
                            </div>
                            <div className='m-6'>
                                <button className='bg-[#FF4A80] w-full p-2 rounded-md text-white font-sans font-bold text-[1.1rem]'>Jadi Premium</button>
                            </div>


                        </div>

                </div>

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

