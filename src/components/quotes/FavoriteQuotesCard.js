import React from "react";

const FavoriteQuoteCard = ({ favoriteQuote, removeFromFavorites }) => {
    return(
        <li className='quote-card'>
            <span className='close-quote' onClick={() => removeFromFavorites(favoriteQuote.id)}>x</span>
            <h3>{favoriteQuote.text}</h3>
            <p>{favoriteQuote.author}</p>
        </li>
    );
};

export default FavoriteQuoteCard;