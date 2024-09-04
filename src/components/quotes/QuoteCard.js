import React from "react";

const QuoteCard = ( {quote} ) => {
    return (
        <article className='quote-card'>
            <div>
                <div className="categories">
                    {quote.categories.map((category) => (
                        <span className="category" key={category}>{category}</span>
                    ))}
                </div>
                <h3>{quote.text}</h3>
            </div>
            <footer>
                <p className='author'>{quote.author}</p>
            </footer>
        </article>
    )
};

export default QuoteCard;