import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../public/css/style.css"
import { FaPlay } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Badge } from "flowbite-react";
import axios from 'axios';


const MultiCarouselLanding = () => {

    const [isHover, setisHover] = useState(null);
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scheduleDayList, setScheduleDayList] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState([]);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const getAnimeListWithSchedule = async () => {
        const apiUrl = import.meta.env.VITE_API;
        try {
            // request schedule anime list
            const scheduleResponse = await axios.get(`${apiUrl}/schedule`);
            const scheduleList = scheduleResponse.data.scheduleList;
            setScheduleDayList(scheduleList.day); // set day to state

            const ongoingPage = [];
            let currentPage = 1;
            let hasMorePages = true;
            while (hasMorePages) {
                const ongoingResponse = await axios.get(`${apiUrl}/ongoing/page/${currentPage}`);
                const ongoingList = ongoingResponse.data.animeList;

                if (ongoingList.length > 0) {
                    ongoingPage.push(...ongoingList);
                    currentPage++;
                } else {
                    hasMorePages = false;
                }
            }

            // merging data anime from schedule with ongoing
            const mergedScheduleWithOngoing = await Promise.all(
                scheduleList.map(async (schedule) => {
                    const filtredAnimeList = await Promise.all(
                        schedule.animeList.filter(anime =>
                            ongoingPage.some(ongoingAnime => ongoingAnime.id === anime.id)
                        ).map(async (anime) => {
                            // get genre in every anime list
                            const genreResponse = await axios.get(`${apiUrl}/anime/${anime.id}`);
                            const genreList = genreResponse.data.genre_list.slice(0, 3).map((genre) => genre.genre_name);
                            return {
                                ...anime, genres: genreList
                            };
                        })
                    )
                    return{
                        ...schedule,
                        animeList: filtredAnimeList
                    }
                })
            )
            setFilteredSchedule(mergedScheduleWithOngoing);
            console.log(mergedScheduleWithOngoing);
        } catch (error) {
            console.log('error fetching data:', error);
        }
    }

    useEffect(() => {
        getAnimeListWithSchedule();
    }, []);

    if (loading) return <div>Loading...</div>;


    return (
        <div className="parent">
            <div className='flex justify-start items-center gap-10'>
                <h1 className="text-2xl font-bold text-gray-900 ml-10">Jadwal Tayang</h1>

                <div className='flex justify-center items-center gap-1'>
                    <div className='bg-gray-100  h-fit w-fit p-2 rounded-sm'>
                        <p className='text-sm font-semibold'>Senin</p>
                    </div>
                </div>
            </div>
            <Carousel
                responsive={responsive}
                autoPlay={true} x
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                // dotListClass="custom-dot-list-style"
                partialVisible={false}>
                {animeList.map((anime, index) => {

                    return (

                        <div className="slider relative h-fit" key={index} onMouseEnter={() => setisHover(index)} onMouseLeave={() => setisHover(null)}>
                            <div className={`transition-transform duration-75 ease-in-out  ${isHover === index ? 'transform scale-[1.2] rounded-lg' : ''}`}>
                                <div className="relative cursor-pointer">
                                    <img
                                        src={anime.thumb}
                                        alt="movie"
                                        className={`w-full ${isHover === index ? 'rounded-lg' : ''}`}  // Tambahkan rounded-lg di sini saat hover
                                    />
                                    {isHover === index && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-sky-500/10 via-sky-400/95 to-sky-400  p-4 flex flex-col justify-between items-start h-2/3 rounded-lg">
                                            <div className='self-center'>
                                                <FaPlay className='text-6xl text-white' />
                                            </div>
                                            <div className='flex flex-col items-start gap-2'>
                                                <p className='text-xs font-bold font-sans text-white'>{anime.title}</p>
                                                <div className="flex flex-row gap-1">
                                                    {anime.genres.map((genre, index) => (
                                                        <p key={index} className="text-[0.6rem] font-semibold font-sans text-white bg-sky-500 px-2 py-[0.15rem] rounded-sm">
                                                            {genre}
                                                        </p>
                                                    ))}
                                                </div>

                                                <p className='text-xs font-semibold font-sans text-white'>{anime.episode.replace('Episode', ' Episode')}</p>
                                            </div>
                                        </div>
                                    )}
                                    <p className='text-sm font-semibold font-sans'>{anime.title}</p>
                                    {filteredSchedule.length > 0?(
                                        filteredSchedule.map((schedule, index) => (
                                            <div key={index}>
                                                <p>{schedule.day}</p>
                                            </div>
                                        ))
                                    ): (
                                            <p>no data avalia</p>

                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Carousel>

        </div>

    )
}

export default MultiCarouselLanding