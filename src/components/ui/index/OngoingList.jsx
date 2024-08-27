import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import "../../../../public/css/style.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const OngoingList = ({ setisHover, isHover, setLoading, isLoading }) => {
    const [ongoingAnimeList, setOngoingAnimeList] = useState([]);

    const getOngoingAnimeList = async () => {
        const apiUrl = import.meta.env.VITE_API;
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/home`);
            const ongoingAnime = response.data.home.on_going;
            setOngoingAnimeList(ongoingAnime);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOngoingAnimeList();
    }, []);

    // if (isLoading) return <div>Loading...</div>;

    return (
        <div className="mx-10">
            <div className='flex justify-between items-center px-3'>
                <h1 className='font-bold text-xl'>Ongoing Anime</h1>
                <div className='flex items-center'>
                    <p className='text-sm font-semibold'>Lihat lebih banyak</p>
                    <IoIosArrowForward className='ml-1' />
                </div>
            </div>

            {/* Grid Layout for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5">
                {ongoingAnimeList.map((anime, index) => {
                    return (
                        <div
                            className="relative h-fit"
                            key={index}
                            onMouseEnter={() => setisHover(anime.id)}
                            onMouseLeave={() => setisHover(null)}
                        >
                            <Link to={`/anime/${anime.id}`}>

                                <div className={`transition-transform duration-75 ease-in-out mb-10 shadow-sm ${isHover === anime.id ? 'transform scale-[1.2] rounded-lg' : ''}`}>
                                    <div className="relative cursor-pointer min-h-[320px] ">
                                        <img
                                            src={anime.thumb}
                                            alt="anime"
                                            className={`w-full h-full object-cover rounded-lg`}  // Tambahkan rounded-lg di sini saat hover
                                        />

                                        {isHover === anime.id && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-sky-500/10 via-sky-400/95 to-sky-400 p-4 flex flex-col justify-between items-start h-2/3 rounded-lg ">
                                                <div className='self-center'>
                                                    <FaPlay className='text-6xl text-white' />
                                                </div>
                                                <div className='flex flex-col items-start gap-2'>
                                                    <p className='text-xs font-bold font-sans text-white'>{anime.title}</p>
                                                    <div className="flex flex-row gap-1">
                                                        <p className="text-[0.6rem] font-semibold font-sans text-white bg-sky-500 px-2 py-[0.15rem] rounded-sm">
                                                            Uploaded {anime.uploaded_on}
                                                        </p>
                                                        <p className="text-[0.6rem] font-semibold font-sans text-white bg-sky-500 px-2 py-[0.15rem] rounded-sm">
                                                            {anime.day_updated}
                                                        </p>
                                                    </div>
                                                    <p className='text-xs font-semibold font-sans text-white'>{anime.episode}</p>
                                                </div>
                                            </div>
                                        )}
                                        {isHover !== anime.id && (

                                            <p className='text-sm font-semibold font-sans mt-2'>{anime.title}</p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OngoingList;
