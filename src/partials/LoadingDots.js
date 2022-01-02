import React from 'react';
import './LoadingDots.css';

function* dotGenerator() {
    for(let i = 0; i < 4; i++)
        yield <div key={i} className="dot"></div>
}

const LoadingDots = () => {
    return <div className="loading-dots">
        {[...dotGenerator()]}
    </div>
}

export default LoadingDots;