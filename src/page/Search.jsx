import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import { useParams } from 'react-router';
import Card from '../components/ui/Search/Card';
import Loading from '../components/Loading';

const Search = () => {
    const [dataAnime, setDataAnime] = useState([]);
    const [synopsis, setSynopsis] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API;
    const {keyword} = useParams();
    const fetchData = async () => {
        try {
            setLoading(true);
            const responseAnime = await axios.get(`${apiUrl}/search/${keyword}`);
            const findAnime = responseAnime.data.data;
            const getSynopsis = await Promise.all(
                findAnime.map(async (anime) => {
                    const responseDetail = await axios.get(`${apiUrl}/anime/${anime.slug}`);
                    const synopsis = responseDetail.data.data.synopsis
                    return {
                        ...anime,
                        synopsis
                    }

                })
            );
            setDataAnime(getSynopsis);
            console.log(getSynopsis);
            findAnime.map((anime) => console.log(anime.genres))
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [keyword])

    if(loading){
        return (
            <div className='h-screen flex flex-col justify-center items-center'>
                <Loading />
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className='ml-4 sm:mx-10 md:mx-20 my-10'>
                <div className='w-full'>
                    {dataAnime && dataAnime.length > 0 ? (
                        <Card dataAnime={dataAnime} synopsis={synopsis}/>
                    ): (
                        <p className='text-3xl font-bold text-center'>Tidak dapat menemukan anime 😢</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Search