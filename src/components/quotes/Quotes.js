import React from "react";
import QuoteCard from "./QuoteCard";
import CategoryForm from "./CategoryForm";

const Quotes = ({ quotes, category, categories, change }) => {
    return (
        <section className='all-quotes'>
            <div className='quotes wrapper'>
                <div className='category-header'>
                    <p>Browse through your collection of quotes</p>
                    <CategoryForm category={category} categories={categories} change={change} />
                </div>
                {quotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                ))}
            </div>
        </section>
    );
};

export default Quotes;