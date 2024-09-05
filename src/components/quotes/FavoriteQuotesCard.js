import React from "react";

const FavoriteQuoteCard = ({ favoriteQuote }) => {
    return(
        <li className='quote-card'>
            <span className='close-quote'>x</span>
            <h3>{favoriteQuote.text}</h3>
            <p>{favoriteQuote.author}</p>
        </li>
    );
};

export default FavoriteQuoteCard;