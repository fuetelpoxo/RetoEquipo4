import React from 'react';
import './Loading.css';

function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="dots-container">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                
            </div>
        </div>
    );
}

export default Loading;