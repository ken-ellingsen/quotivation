import React from "react";
import QuoteCard from "./QuoteCard";
import CategoryForm from "./CategoryForm";

const Quotes = ({ quotes, category, categories, change, addToFavorites, favoriteQuotes }) => {

    const filterMessage = category === "All" ? `You have ${quotes.length} great quotes.` : 
        (quotes.length > 1) ? `You have ${quotes.length} great ${category} quotes.` : `You have one great ${category} quote.`;

    return (
        <section className='all-quotes'>
            <div className='quotes wrapper'>
                <div className='category-header'>
                    <h2>Pick your Favorite Quotes Below</h2>
                    <p>{filterMessage}</p>
                    <CategoryForm category={category} categories={categories} change={change} />
                </div>
                {quotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} addToFavorites={addToFavorites} favoriteQuotes={favoriteQuotes} />
                ))}
            </div>
        </section>
    );
};

export default Quotes;