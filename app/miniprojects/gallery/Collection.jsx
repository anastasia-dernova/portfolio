import React, { useState } from 'react';

export const Collection = ({ images, name }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getDisplayImages = () => {
        let displayImages = [...images];
        displayImages = [
            displayImages[currentIndex],
            ...displayImages.slice(currentIndex + 1),
            ...displayImages.slice(0, currentIndex)
        ];
        return displayImages;
    };

    return (
        <div className="collection">
            <button 
                onClick={handlePrev} 
                className="collection__nav-button collection__nav-button--prev"
            >
                ←
            </button>
            <button 
                onClick={handleNext} 
                className="collection__nav-button collection__nav-button--next"
            >
                →
            </button>
            <img 
                className="collection__big" 
                src={getDisplayImages()[0]} 
                alt="Item" 
            />
            <div className="collection__bottom">
                <img className="collection__mini" src={getDisplayImages()[1]} alt="Item" />
                <img className="collection__mini" src={getDisplayImages()[2]} alt="Item" />
                <img className="collection__mini" src={getDisplayImages()[3]} alt="Item" />
            </div>

            <h4>{name}</h4>
        </div>
    );
};