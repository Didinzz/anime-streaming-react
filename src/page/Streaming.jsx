import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Navbar from '../components/Navbar'
import axios from 'axios'
const Streaming = () => {
  const [episode, setEpisode] = useState([])
  const apiUrl = import.meta.env.VITE_API


  const getStreamingAnime = async () => {
    try {
      const response = await axios.get(`${apiUrl}/anime/1piece-sub-indo`)

      setEpisode(response.data.data.episode_lists);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStreamingAnime()
  }, [])

  return (
    <>
    <Navbar />
      <div className='w-full h-screen grid grid-cols-4 bg-red-600 px-8 pt-7 gap-10'>
          <div className='col-span-3 pl-20 '>

            <iframe src="https://desudrive.com/dstream/playdesu/index.php?id=MnBXN1dwZWEzbHFLNjh4NGt5KzdlRFhtKzlJMnhMSUxQejRMT0hNT3dSRT0=" frameborder="0" className='w-[100%] h-[85%] rounded-lg'></iframe>

          </div>

        <div className='col-span-1 bg-yellow-900   '>
            <h1 className='text-2xl font-semibold '>Semua Episode</h1>
          <div className='grid grid-cols-4 overflow-y-auto bg-blue-900 h-[calc(100vh-200px)]'>
            {episode.slice().reverse().map((eps, index)=> (
              <button className='btn w-14 h-2 mb-1'>{eps.episode}</button>
            ))}
            </div>
          </div>

        </div>
    </>
  )
}

export default Streaming