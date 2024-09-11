import React, { useEffect, useState } from 'react'

const Synopsis = ({ synopsis }) => {
    const [charLimit, setCharLimit] = useState(500)

    const updateCharLimit = () => {
        const screenWidth = window.innerWidth;
        if(screenWidth <= 480){
            setCharLimit(80)
        } else if (screenWidth <= 768) {
            setCharLimit(100); 
        }else if (screenWidth <= 1024) {
            setCharLimit(150);
        }else if(screenWidth <= 1280) {
            setCharLimit(250);
        }else {
            setCharLimit(500); 
        }
    }
    useEffect(() => {
        updateCharLimit()
        window.addEventListener('resize', updateCharLimit)

        return () => window.removeEventListener('resize', updateCharLimit)
    }, [])

    const turncatedSynopsis = synopsis.length > charLimit ? `${synopsis.slice(0, charLimit)}...` : synopsis
    return (
        <>
        <div className='w-full'>
            <p className='break-all'>{turncatedSynopsis}</p>
        </div>
        </>
    )
}

export default Synopsis