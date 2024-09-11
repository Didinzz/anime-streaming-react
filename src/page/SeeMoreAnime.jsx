import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import Pagination from '../components/ui/SeeMore/Pagination';
import backgroundImage from '../../public/image/animekeren.jpg';
import { Link } from 'react-router-dom';
import Skeleton from '../components/Skeleton';
import Loading from '../components/Loading';

const CompleteAnime = () => {
  const [dataAnime, setDataAnime] = useState([]);
  const [page, setPage] = useState({});
  const [pagination, setPagination] = useState(1);
  const { type } = useParams();
  const apiUrl = import.meta.env.VITE_API;
  const scrollRef = useRef(null);
  const getDataAnime = async () => {
    try {
      const response = await axios.get(`${apiUrl}/${type}/${pagination}`);
      const animeList = response.data.data;
      const dataPagination = response.data.pagination;
      setPage(dataPagination);
      setDataAnime(animeList);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataAnime();
  }, [pagination]);

  const handlePageChanges = (newPage) => {
      setPagination(newPage);
      if(scrollRef.current){
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const divStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden', 
  }
  return (
    <div className='bg-base-200 h-screen flex flex-col' style={divStyle} >
      <Navbar />
      <div ref={scrollRef} className='mx-auto max-w-screen-lg mt-7 s flex flex-col gap-6 overflow-y-scroll h-full  flex-grow-0'  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className='p-4'>
          <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold font-serif'>Daftar {type.replace(/\b\w/g, char => char.toUpperCase())} Baru</h1>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between px-4 '>
            <h4 className='text-base sm:text-lg lg:text-xl font-medium'>Total {dataAnime.length} </h4>
            <p className='text-base sm:text-lg lg:text-xl'>Page {page.current_page}</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            {dataAnime.length > 0 ? (
              dataAnime.map((anime, index) => (
                <div key={index} className="card card-side glass shadow-xl w-full md:max-w-lg">
                  <figure className='w-1/3'>
                    <img
                      src={anime.poster}
                      alt="Movie"
                      className='object-cover w-full h-full'
                    />
                  </figure>
                  <div className="card-body w-2/3 p-3">
                    <h2 className="card-title text-lg font-bold">{anime.title}</h2>
                    {type === 'ongoing-anime' ? <p className='text-sm font-semibold'>Diperbarui ke: {anime.current_episode}</p> : <p className='text-sm font-semibold'>Tamat: {anime.episode_count} Episode</p>}

                      {type === 'ongoing-anime' ? <p className='text-sm font-semibold'>Jadwal: {anime.release_day}</p> : <p className='text-sm font-semibold'>Rating: {anime.rating} ⭐</p>}

                    {type === 'ongoing-anime' ? <p className='text-sm font-semibold'>Update: {anime.newest_release_date}</p> : <p className='text-sm font-semibold'>last Relase: {anime.last_release_date}</p>}
                    <div className="card-actions justify-end">
                      <Link to={`/anime/${anime.slug}`} className="btn btn-primary btn-md rounded-md w-full " >
                      Watch
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full ">
             <Loading />
              </div>
            )}

          </div>
        </div>
        
          <div className='p-4 self-center'>
          <Pagination currentPage={page.current_page} hasPreviousPage={page.has_previous_page} hasNextPage={page.has_next_page} lastPage={page.last_visible_page}  previousPage={page.previous_page} nextPage={page.next_page} handlePageChanges={handlePageChanges}/>
          </div>
      </div>
    </div>
  );
}

export default CompleteAnime;
