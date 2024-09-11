import { data } from 'autoprefixer'
import React from 'react'

const Caption = ({ dataStream, dataAnime }) => {
  return (
    <>
      <div className='font-sans mt-10 flex flex-col gap-3 h-fit '>
        {dataStream.episode ? (
          <h1 className='text-2xl font-semibold '>{dataStream.episode}</h1>
          
        ) : (<div className="skeleton h-4 w-52"></div>)}

        {dataAnime.genres && dataAnime.genres.length > 0 ? (
          <div className='flex gap-3 flex-row '>
            {dataAnime.genres.map((genre, index) => (
              <button key={index} className='btn btn-xs font-semibold text-blue-700'>{genre.name}</button>
            ))}
          </div>
        ) : (<div className="skeleton h-4 w-96"></div>)}
        <div>
          {dataAnime.synopsis ? (

            <p className='indent-8 break-all pl-10 sm:p-0'>{dataAnime.synopsis}</p>
          ) : (<div className="skeleton h-4 w-full"></div>)}
        </div>

      </div>

    </>
  )
}

export default Caption