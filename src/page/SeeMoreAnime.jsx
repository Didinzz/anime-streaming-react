import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import Pagination from '../components/ui/SeeMore/Pagination';
import backgroundImage from '../../public/image/animekeren.jpg';
import Footer from '../components/Footer';

const CompleteAnime = () => {
  const [dataAnime, setDataAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const { type } = useParams();
  const apiUrl = import.meta.env.VITE_API;

  const getDataAnime = async (currentPage) => {
    try {
      const response = await axios.get(`${apiUrl}/${type}/page/${currentPage}`);
      const animeList = response.data.animeList;

      if (animeList.length === 0 && currentPage > 1) {
        setTotalPage(currentPage - 1);
        setPage(currentPage - 1); // Kembali ke halaman sebelumnya jika tidak ada data di halaman saat ini
      } else {
        setDataAnime(animeList);
        if (totalPage === null) {
          calculateMaxPage(type);
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const calculateMaxPage = async (type) => {
    let startPage = type === 'ongoing' ? 5 : 54;
    let currentPage = startPage;



    while (true) {
      try {
        const response = await axios.get(`${apiUrl}/${type}/page/${currentPage}`);
        if (response.data.animeList.length === 0) {
          setTotalPage(currentPage - 1);
          break;
        }
        currentPage++;
      } catch (error) {
        console.log("Error checking max page:", error);
        break;
      }
    }

    setTotalPage(currentPage - 1);
  };

  useEffect(() => {
    getDataAnime(page);
  }, [page]);

  const handlePageChanges = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };


  const divStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
  }
  return (
    <div className='bg-base-200' style={divStyle}>
      <Navbar />
      <div className='mx-auto max-w-screen-lg mt-7 s flex flex-col gap-6 overflow-y-auto h-screen' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{
        `div::-webkit-scrollbar {
         display: none;}`}
         </style>
        <div className='p-4'>
          <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold font-serif'>Daftar {type.replace(/\b\w/g, char => char.toUpperCase())} Baru</h1>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between px-4 '>
            <h4 className='text-base sm:text-lg lg:text-xl font-medium'>Total {dataAnime.length} </h4>
            <p className='text-base sm:text-lg lg:text-xl'>Page {page}</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            {dataAnime.length > 0 ? (
              dataAnime.map((anime, index) => (
                <div key={index} className="card card-side glass shadow-xl w-full md:max-w-lg">
                  <figure className='w-1/3'>
                    <img
                      src={anime.thumb}
                      alt="Movie"
                      className='object-cover w-full h-full'
                    />
                  </figure>
                  <div className="card-body w-2/3 p-4">
                    <h2 className="card-title text-lg font-bold">{anime.title}</h2>
                    {type === 'ongoing' ? <p className='text-sm'>Diperbarui ke: {anime.episode}</p> : <p className='text-sm'>Tamat: {anime.episode.replace('Episode', ' Episode')}</p>}
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-md rounded-md">Watch</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-lg sm:text-xl lg:text-2xl'>Data tidak tersedia</p>
            )}

          </div>
        </div>
        {totalPage && (
          <div className='p-4 self-center'>
            <Pagination page={page} handlePageChanges={handlePageChanges} totalPage={totalPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CompleteAnime;
