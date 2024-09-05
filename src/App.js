import { useState, useEffect } from "react";
import Header from "./components/Header";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Quotes from "./components/quotes/Quotes";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import "./App.css";

function App() {
  // State variables
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  // Other variables
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  const categories = 
    ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];
  const filteredQuotes =
    category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;
  const maxFaves = 3;

  // Functions
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const request = await fetch(quotesUrl);
      const result = await request.json();
      setQuotes(result);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
    setLoading(false);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }
  
  const addToFavorites = (quoteId) => {
    const selectedQuote = quotes.find((quote) => quote.id === quoteId);
    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id);

    if (alreadyFavorite) {
      console.log("This quote is already in your favorites! Choose another");
    } else if (favoriteQuotes.length < maxFaves) {
      setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      console.log("Added to favorites!");
    } else {
      console.log("Max number of Favorite Quotes reached. Please delete one to add another!");
    }
  }

  // useEffect Hook
  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className='App'>
      <Header />
      <main>
        <FavoriteQuotes favoriteQuotes={favoriteQuotes} maxFaves={maxFaves} />
        {loading ? <Loader /> : <Quotes quotes={filteredQuotes} category={category} categories={categories} 
          change={handleCategoryChange} addToFavorites={addToFavorites} />}
      </main>
      <Footer />
    </div>
  );
}
export default App;
