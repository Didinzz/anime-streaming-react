import { data } from 'autoprefixer'
import React from 'react'

const Caption = ({ dataStream, dataAnime }) => {
  return (
    <>
      <div className='font-sans mt-10 flex flex-col gap-3 h-fit '>
        <h1 className='text-2xl font-semibold '>{dataStream.episode}</h1>
{dataAnime.genres && dataAnime.genres.length > 0 &&(
        <div className='flex gap-3 flex-row '>
          {dataAnime.genres.map((genre, index) => (
          <button key={index} className='btn btn-xs font-semibold text-blue-700'>{genre.name}</button>
          ))}
        </div>
)}
        <div>
          {dataAnime.synopsis ? (

            <p className='indent-8 break-all'>{dataAnime.synopsis}</p>
          ):(

            <p className='indent-8 break-all'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque aliquam voluptates temporibus nihil cupiditate! Asperiores tempora eius corporis quia. Ea enim eligendi tempore laudantium eaque. Exercitationem commodi ab voluptatem inventore iste numquam nulla. Totam vitae voluptatum, provident illo ducimus corrupti facilis quo, cumque minus quae possimus error delectus tenetur at?</p>
          )}
        </div>

      </div>

    </>
  )
}

export default Caption