import React from 'react';
import './LoadingComponent.css';

const LoadingComponent = () => {
    return (
        <div className="loading-container">
            <div className="loading-animation"></div>
            <p>Waiting for data</p>
        </div>
    );
}

export default LoadingComponent;
