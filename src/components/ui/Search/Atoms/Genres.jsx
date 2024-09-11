import React from 'react'

const Genres = ({ genres }) => {
  return (
      <div className='flex flex-wrap gap-2'>
          {genres.slice(0, 4).map((genre, index) => (
              <button className='btn btn-xs bg-base-400 font-normal text-blue-700'>{genre.name}</button>
          ))}
      </div>
  )
}

export default Genres