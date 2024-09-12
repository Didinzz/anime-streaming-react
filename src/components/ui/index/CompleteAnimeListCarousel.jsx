import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../../../public/css/style.css"
import { FaPlay } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton from '../../Skeleton';

const MultiCarouselLanding = ({ setisHover, isHover }) => {
    const [isLoading, setLoading] = useState(false);
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
            const response = await axios.get(`${apiUrl}/home`);
            const completeList = response.data.data.complete_anime;
            const animeListWithGenre = await Promise.all(
                completeList.map(async (anime) => {
                    // second request to get genre complete anime list
                    const animeGenreResponse = await axios.get(`${apiUrl}/anime/${anime.slug}`);
                    const genreList = animeGenreResponse.data.data.genres;
                    //merging data
                    return {
                        ...anime,
                        genres: genreList.slice(0, 3).map((genre) => genre.name), // extract genre name
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

    const skeletonArray =  15;

    if (isLoading) return (
        <div className='flex mt-2 justify-center'>
            {[...Array(skeletonArray)].map((_, index) => (
                <div key={index}>
                    <Skeleton />
                </div>
            ))}
        </div>

    );
    return (
        <div className="parent">
            <div className='flex justify-between items-center mt-3'>
                <h1 className="text-xl font-bold  ml-10">Complete Anime</h1>
                <div className='flex items-center mr-10 '>
                    <Link to={'/complete-anime'}>
                        <p className='text-sm font-semibold'>Lihat lebih banyak</p>
                    </Link>
                    <IoIosArrowForward className=" ml-1 mt-1" />
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
                            onMouseEnter={() => setisHover(anime.slug)}
                            onMouseLeave={() => setisHover(null)}>
                            <div className={`transition-transform duration-75 ease-in-out ${isHover === anime.slug ? 'transform scale-[1.2] rounded-lg' : ''}`}>
                                <div className="relative cursor-pointer">
                                    <img
                                        src={anime.poster}
                                        alt="movie"
                                        className={`w-full ${isHover === anime.slug ? 'rounded-lg' : ''}`}
                                    />
                                    {isHover === anime.slug && (
                                        <Link to={`/anime/${anime.slug}`} className="absolute top-0 left-0 right-0 bottom-0">

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

                                                    <p className='text-xs font-semibold font-sans text-white'>{anime.episode_count} Episode</p>
                                                </div>
                                            </div>
                                        </Link>

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