import React from 'react';

const Card = ({ id, image, isFlipped, isMatched, handleClick }) => {
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'spin' : ''}`} onClick={() => handleClick(id)}>
            <img src={image} alt="card" />
        </div>
    );
};

export default Card;