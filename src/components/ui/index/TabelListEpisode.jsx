import React from 'react'
import { Link } from 'react-router-dom'

const TabelListEpisode = ({ episodeList, idAnime }) => {
  return (
        <div className="overflow-x-auto bg-base-100 h-[350px] overflow-y-scroll mt-4">
            <table className="min-w-full text-left text-sm whitespace-nowrap ">

                <thead className=" tracking-wider sticky top-0 bg-base-100 outline outline-1 basis-1/3">
                    <tr>
                        <th scope="col" className="px-6 py-2 w-3/4">
                        </th>
                    </tr>
                </thead>
                <tbody className='basis-2/3'>
                    
                    {episodeList.slice().reverse().map((eps, index)=> (
                    <tr className="hover:bg-base-200" key={index}>
                        <th scope="row" className="px-6 py-2">
                                <Link to={`/anime/${idAnime}/episode/${eps.slug}`}>{eps.episode}</Link>
                        </th>
                    </tr>
                    ))}

                </tbody>

            </table>

        </div>
  )
}

export default TabelListEpisode