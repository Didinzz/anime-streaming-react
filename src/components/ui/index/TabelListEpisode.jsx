import React from 'react'
import { Link } from 'react-router-dom'

const TabelListEpisode = ({ episodeList }) => {
  return (
        <div className="overflow-x-auto bg-base-100 h-[350px] overflow-y-scroll mt-4">
            <table className="min-w-full text-left text-sm whitespace-nowrap ">

                <thead className=" tracking-wider sticky top-0 bg-base-100 outline outline-1 basis-1/3">
                    <tr>
                        <th scope="col" className="px-6 py-2 w-3/4">
                            Episode
                        </th>
                        <th scope="col" className="px-6 py-2 mr-auto w-1/4 text-center">
                            Tanggal rilis

                        </th>
                    </tr>
                </thead>
                <tbody className='basis-2/3'>
                    {episodeList.map((eps, index)=> (
                    <tr className="hover:bg-base-200" key={index}>
                        <th scope="row" className="px-6 py-2">
                            <Link to={`${eps.link}`}>{eps.title}</Link>
                        </th>
                            <td className="px-6 py-2 text-center">{eps.uploaded_on}</td>
                    </tr>
                    ))}

                </tbody>

            </table>

        </div>
  )
}

export default TabelListEpisode