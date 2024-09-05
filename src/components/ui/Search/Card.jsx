import React from 'react'
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Genres from './Atoms/Genres';
import Synopsis from './Atoms/Synopsis';

const Card = ({ dataAnime, synopsis }) => {
    return (
        <>
            {dataAnime.map((anime, index) => (
                <div className="card card-side  bg-base-100 mb-10 w-full" key={index}>
                    <figure className='w-48 sm:w-56 lg:w-60'>
                        <img
                            src={`${anime.poster}`}
                            alt="Movie" className='rounded-lg w-full h-auto' />
                    </figure>
                    <div className="card-body w-1/2">
                        <h2 className="card-title">{anime.title}</h2>
                        {anime.genres && anime.genres.length > 0 && (
                            <Genres genres={anime.genres} />
                        )}
                        {anime.synopsis ? (
                            <Synopsis synopsis={anime.synopsis} />
                        ): (
                            <div>
                            <p>Belum ada synopsis</p>
                            </div>
                        )}
                        <div className='card-actions'>
                            <Link to={`/anime/${anime.slug}`}>
                                <button className='mt-4 py-3 px-2 sm:px-6 bg-blue-500 hover:bg-blue-600 w-full rounded-lg flex justify-center items-center gap-2 cursor-pointer'>
                                    <FaPlay className='text-white' />
                                    <span className='text-white font-bold'>Segera Tonton</span>
                                </button>

                            </Link>
                        </div>
                    </div>
                </div>
            ))}

        </>

    )
}

export default Card