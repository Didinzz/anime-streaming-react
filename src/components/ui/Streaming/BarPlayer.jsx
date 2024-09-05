import React from 'react';
import '../../../../public/css/AnimatedBar.css';

const BarPlayer = () => {
    return (
        <div className="relative">
            <div className="absolute bottom-0 left-0 flex items-end space-x-[0.2rem]">
                <div className="bar h-[0.15rem] w-[0.20rem] bg-blue-500 animate-bar1"></div>
                <div className="bar h-[0.15rem] w-[0.20rem] bg-blue-500 animate-bar2"></div>
                <div className="bar h-[0.15rem] w-[0.20rem] bg-blue-500 animate-bar3"></div>
            </div>
        </div>
    );
}

export default BarPlayer;
