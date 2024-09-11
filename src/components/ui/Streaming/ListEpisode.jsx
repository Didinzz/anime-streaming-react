import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BarPlayer from './BarPlayer';

const ListEpisode = ({ slugStream, idAnime, numberEpisode }) => {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {numberEpisode.slice().reverse().map((eps) => {
                const isActive = slugStream === eps.slug; // Memeriksa apakah episode ini aktif

                return (
                    <div className='flex flex-col w-full' key={eps.slug}>
                        <Link 
                            to={`/anime/${idAnime}/episode/${eps.slug}`} 
                            className={`btn w-full ${isActive ? 'bg-blue-100 cursor-default' : 'bg-transparent hover:bg-base-200'}`}
                            style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                        >
                            E{eps.episode}
                        </Link>
                        {isActive && (
                            <div>
                                <BarPlayer />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ListEpisode;
