import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../../../public/css/style.css"
import { FaPlay } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';


const MultiCarouselLanding = ({setisHover, isHover, setLoading, isLoading}) => {

    const [animeList, setAnimeList] = useState([]);
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

    const completeAnimeWithGenre = async () => {
        const apiUrl = import.meta.env.VITE_API;
        try {
            setLoading(true);
            // first request to get complete list anime
            const response = await axios.get(`${apiUrl}/complete`);
            const completeList = response.data.animeList;

            const animeListWithGenre = await Promise.all(
                completeList.map(async (anime) => {
                    // second request to get genre complete anime list
                    const animeGenreResponse = await axios.get(`${apiUrl}/anime/${anime.id}`);
                    const genreList = animeGenreResponse.data.genre_list;

                    //merging data
                    return {
                        ...anime,
                        genres: genreList.slice(0, 3).map((genre) => genre.genre_name), // extract genre name
                    };

                })
            )
            setAnimeList(animeListWithGenre);
        } catch (error) {
            console.log('error fetching data:'.error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        completeAnimeWithGenre();
    }, []);

    // if (isLoading) return <div>Loading...</div>;
    return (
        <div className="parent">
            <div className='flex justify-between items-center'>
                <h1 className="text-xl font-bold text-gray-900 ml-10">Complete Anime</h1>
                <div className='flex items-center mr-10'>
                    <p className='text-sm font-semibold'>Lihat lebih banyak</p>
                    <IoIosArrowForward className="text-gray-600 ml-1 mt-1" />
                </div>
            </div>
            <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                // dotListClass="custom-dot-list-style"
                partialVisible={false}>
                {animeList.map((anime, index) => {

                    return (
                        <div className="slider relative h-fit" key={index} 
                        onMouseEnter={() => setisHover(anime.id)} 
                        onMouseLeave={() => setisHover(null)}>
                            <div className={`transition-transform duration-75 ease-in-out ${isHover === anime.id ? 'transform scale-[1.2] rounded-lg' : ''}`}>
                                <div className="relative cursor-pointer">
                                    <img
                                        src={anime.thumb}
                                        alt="movie"
                                        className={`w-full ${isHover === anime.id ? 'rounded-lg' : ''}`}  // Tambahkan rounded-lg di sini saat hover
                                    />
                                    {isHover === anime.id && (
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