import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import Navbar from '../components/Navbar'
import Caption from '../components/ui/Streaming/Caption'
import Footer from '../components/Footer'
import ListEpisode from '../components/ui/Streaming/ListEpisode'
import Loading from '../components/Loading'
import BarPlayer from '../components/ui/Streaming/BarPlayer'
import DetailAnime from './DetailAnime'

const Streaming = () => {
  const [dataAnime, setDataAnime] = useState([]);
  const [dataStream, setDataStream] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API;
  const { id, slugStream } = useParams();

  const getStreamingAnime = async () => {
    try {
      setLoading(true);
      const responseStreaming = await axios.get(`${apiUrl}/episode/${slugStream}`);
      const dataStreaming = responseStreaming.data.data;
      const response = await axios.get(`${apiUrl}/anime/${id}`);
      const anime = response.data.data 

      const getEpisode = anime.episode_lists.map((eps)=>{
        const episodeMatch = eps.episode.match(/Episode\s+(\d+)/i);
        const episodeNumber = episodeMatch ? episodeMatch[1] : null;

        return {
          ...eps,
          episode: episodeNumber
        }
      })

      setEpisode(getEpisode);
      setDataAnime(anime);
      setDataStream(dataStreaming)
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getStreamingAnime();
  }, [slugStream]);



  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen ">
        {/* Konten Utama */}
        <div className="flex flex-col lg:flex-row flex-grow px-8 pt-7 font-sans gap-5">
          <div className="flex-1 flex flex-col items-center lg:pl-20 h-fit">
            {loading ? (
              <div className='w-full h-[80vh] flex justify-center items-center'>
              <Loading />
              </div>
            ): (
            <iframe
              src={dataStream.stream_url}
              frameBorder="10"
              className="w-full h-[80vh] rounded-lg"
              allowFullScreen
            ></iframe>
            )}
          </div>
          <div className="lg:w-1/4 w-full flex flex-col">
            {loading ? (
              <div className="skeleton h-4 w-1/2 mb-5"></div>
            ) : (<h1 className="text-2xl font-semibold mb-4">Semua Episode</h1>)}
            <div className="flex flex-col overflow-y-auto lg:h-[calc(100vh-200px)] h-auto max-h-[400px] lg:max-h-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {dataAnime.episode_lists && dataAnime.episode_lists.length > 0 && (
                <ListEpisode episodeList={dataAnime.episode_lists} idAnime={id} slugStream={slugStream} numberEpisode={episode}/>
              )}
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="pr-8 w-full lg:w-3/4 lg:pl-20 mb-20">
          <Caption dataStream={dataStream} dataAnime={dataAnime}/>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Streaming;
