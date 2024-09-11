import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CarouselLanding from '../components/ui/index/CarouselLanding'
import CompleteAnimeListCarousel from '../components/ui/index/CompleteAnimeListCarousel'
import OngoingList from '../components/ui/index/OngoingList';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import axios from 'axios';

const Index = () => {
  const [isHover, setisHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setisSidebarOpen] = useState(false)

return (
    <>
      <Navbar isScrolled={isScrolled} setIsScrolled={setIsScrolled} isSidebarOpen={isSidebarOpen} setisSidebarOpen={setisSidebarOpen}/>
      <div className='' >
        <CarouselLanding />
        <CompleteAnimeListCarousel setisHover={setisHover} isHover={isHover}/>
        <OngoingList setisHover={setisHover} isHover={isHover} />
      </div>
      <Footer />
    </>
  )
}

export default Index