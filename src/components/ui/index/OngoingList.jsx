import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import "../../../../public/css/style.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import Skeleton from '../../Skeleton';

const OngoingList = ({ setisHover, isHover }) => {
    const [isLoading, setLoading] = useState(false);
    const [ongoingAnimeList, setOngoingAnimeList] = useState([]);

    const getOngoingAnimeList = async () => {
        const apiUrl = import.meta.env.VITE_API;
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/home`);
            const ongoingAnime = response.data.data.ongoing_anime;
            // setOngoingAnimeList(ongoingAnime);
            const ongoingAnimeList = await Promise.all(
                ongoingAnime.map(async(anime)=> {
                    const response = await axios.get(`${apiUrl}/anime/${anime.slug}`);
                    const genreList = response.data.data.genres;

                    return {
                        ...anime,
                        genres: genreList.slice(0, 3).map((genre) => genre.name), // extract genre name
                    }
                })
            )
            setOngoingAnimeList(ongoingAnimeList);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOngoingAnimeList();
    }, []);

    if (isLoading) return (
        <div className='my-5'>
            <Skeleton arraySkeleton={6} />
        </div>
    );

    return (
        <div className="mx-10">
            <div className='flex justify-between items-center px-3'>
                <h1 className='font-bold text-xl'>Ongoing Anime</h1>
                <div className='flex items-center'>
                    <Link to={"/ongoing-anime"}>
                    <p className='text-sm font-semibold'>Lihat lebih banyak</p>
                    </Link>
                    <IoIosArrowForward className='ml-1' />
                </div>
            </div>

            {/* Grid Layout for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8 mt-5">
                {ongoingAnimeList.map((anime, index) => {
                    return (
                        <div
                            className="relative h-fit"
                            key={index}
                            onMouseEnter={() => setisHover(anime.slug)}
                            onMouseLeave={() => setisHover(null)}
                        >
                            <Link to={`/anime/${anime.slug}`}>

                                <div className={`transition-transform duration-75 ease-in-out mb-10 ${isHover === anime.slug ? 'transform scale-[1.2] rounded-lg' : ''}`}>
                                    <div className="relative cursor-pointer min-h-[320px] bg-base-100 ">
                                        <img
                                            src={anime.poster}
                                            alt="anime"
                                            className={`w-full h-full object-cover rounded-lg shadow-xl`}  // Tambahkan rounded-lg di sini saat hover
                                        />

                                        {isHover === anime.slug && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-sky-500/0 via-sky-400/95 to-sky-400 p-4 flex flex-col justify-between items-start h-2/3 rounded-lg ">
                                                <div className='self-center'>
                                                    <FaPlay className='text-6xl text-white' />
                                                </div>
                                                <div className='flex flex-col items-start gap-2'>
                                                    <p className='text-xs font-bold font-sans text-white'>{anime.title}</p>
                                                    <div className="flex flex-row gap-1">
                                                        {anime.genres.map((genre, index)=>(
                                                        <p key={index} className="text-[0.6rem] font-semibold font-sans text-white bg-sky-500 px-2 py-[0.15rem] rounded-sm">
                                                                {genre}
                                                        </p>
                                                            ))}
                                                    </div>
                                                    <div className="flex flex-row gap-1">
                                                        <p className="text-[0.6rem] font-semibold font-sans text-white bg-sky-500 px-2 py-[0.15rem] rounded-sm">
                                                            {anime.release_day}
                                                        </p>
                                                    </div>
                                                    <p className='text-xs font-semibold font-sans text-white'>{anime.current_episode}</p>
                                                </div>
                                            </div>
                                        )}
                                        {isHover !== anime.slug && (

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
