import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaPlay } from "react-icons/fa";
import Footer from '../components/Footer';
import TabelListEpisode from '../components/ui/index/TabelListEpisode';
import Skeleton from '../components/Skeleton';

const DetailAnime = () => {
  const { id } = useParams();
  const [detailAnime, setDetailAnime] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailAnime = async () => {
    const apiUrl = import.meta.env.VITE_API;
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/anime/${id}`);
      setDetailAnime(response.data);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }s
  };

  useEffect(() => {
    getDetailAnime();
  }, []);

  if (loading) return (
    <div className='flex items-center justify-center h-screen'>
      <Skeleton arraySkeleton={1} />
    </div>
  );

  return (
    <>
      <Navbar />
      <div className='bg-base-300 w-full h-auto lg:min-h-[100vh] p-4 lg:p-8 flex justify-center items-center'>
        <div className='flex lg:flex-row flex-col font-sans w-full max-w-6xl items-center justify-center lg:items-start gap-4'>
            <img
              src={detailAnime.thumb}
              alt=""
            className='w-[70%] h-auto max-w-[350px] lg:max-w-[400px] object-cover rounded-lg basos basis-full lg:basis-1/2'
            />
          <div className='flex flex-col gap-4 basis-full lg:basis-1/2 lg:pl-6 h-full'>
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <h1 className='text-2xl font-bold mb-3'>{detailAnime.title}</h1>
              <p className='font-normal'>Skor: <span className='text-sm'>{detailAnime.score}🌟 | {detailAnime.producer}</span></p>
            </div>
            <div>
              <p className='font-normal'>Nama asli: <span className='text-sm'>{detailAnime.japanase}</span></p>
              <p className='font-normal'>Tanggal rilis: <span className='text-sm'>{detailAnime.release_date}</span></p>
              <p className='font-normal'>Status: <span className='text-sm'>{detailAnime.status}</span></p>
              <p className='font-normal'>Studio: <span className='text-sm'>{detailAnime.studio}</span></p>
              <div className='flex flex-col sm:flex-row gap-3 my-3'>
                <p className='font-normal mr-7'>Genre:</p>
                {detailAnime.genre_list && detailAnime.genre_list.length > 0 ? (
                  detailAnime.genre_list.map((genre, index) => (
                    <p className='btn btn-xs text-[12px] font-semibold bg-base-100 rounded-md py-1 px-2 shadow-xl w-full sm:w-fit sm:text-center text-left' key={index}>
                      {genre.genre_name}
                    </p>
                  ))
                ) : (
                  <p>No genres available</p>
                )}
              </div>
              <p>{detailAnime.synopsis}</p>
              <label htmlFor='my_modal_6' className='btn mt-4 py-3 px-6 bg-blue-500 hover:bg-blue-600 w-fit rounded-lg flex justify-center items-center gap-2'>
                <FaPlay className='text-white' />
                <label htmlFor='my_modal_6' className='text-white font-bold'>Segera Tonton</label>
              </label>
              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-5xl h-fit">
                  <div className='w-full bg-base-300 py-2 px-4 rounded-md'>
                    <h3 className="text-lg font-bold ">List Episode {detailAnime.title}</h3>
                  </div>
                  {detailAnime.episode_list && detailAnime.episode_list.length > 0 ? (
                    <TabelListEpisode episodeList={detailAnime.episode_list} />
                  ) : (
                    <p>Tidak ada episode yang tersedia</p>
                  )}
                  <div className="modal-action">
                    <label htmlFor="my_modal_6" className="btn">Close!</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </>
  );
};

export default DetailAnime;
