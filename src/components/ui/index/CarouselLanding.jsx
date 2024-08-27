import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const CarouselLanding = () => {
    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}  >
            {/* <div className='relative z-10'>
                <img src="image/zombie.jpg" />
                <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-slate-50/0 via-slate-50/40 to-gray-100 "></div>
            </div>
            <div>
                <img src="image/animekeren.jpg" />
                <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-slate-50/0 via-slate-50/40 to-gray-200 "></div>
            </div> */}
            <div>
                <img src="image/naga.jpg" />
                <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-slate-50/0 via-slate-50/40 to-gray-200 "></div>
            </div>
        </Carousel>
    )
}

export default CarouselLanding