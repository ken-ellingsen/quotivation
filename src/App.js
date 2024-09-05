import { useState, useEffect } from "react";
import Header from "./components/Header";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Quotes from "./components/quotes/Quotes";
import Footer from "./components/Footer";
import Message from "./components/Message";
import { Loader } from "react-feather";
import "./App.css";

function App() {
  // State variables
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState(JSON.parse(window.localStorage.getItem("favoriteQuotes")) || []);
  const [messageText, setMessageText] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Other variables
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  const categories = 
    ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];
  const filteredQuotes =
    category === "All" ? quotes : quotes.filter((quote) => quote.categories.includes(category));
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
      setMessageText("This quote is already in your favorites! Choose another.");
      setShowMessage(true);
    } else if (favoriteQuotes.length < maxFaves) {
      setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      setMessageText("Added to favorites!");
      setShowMessage(true);
    } else {
      setMessageText("Max number of Favorite Quotes reached. Please delete one to add another!");
      setShowMessage(true);
    }
  }

  const removeFromFavorites = (quoteId) => {
    const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteId);
    setFavoriteQuotes(updatedFavorites);
  }

  const removeMessage = () => {
    setShowMessage(false);
  }

  const setStorage = () => {

  }

  // useEffect Hooks
  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
  }, [favoriteQuotes]);

  return (
    <div className='App'>
      {showMessage && <Message messageText={messageText} removeMessage={removeMessage} />}
      <Header />
      <main>
        <FavoriteQuotes favoriteQuotes={favoriteQuotes} maxFaves={maxFaves} removeFromFavorites={removeFromFavorites} />
        {loading ? <Loader /> : <Quotes quotes={filteredQuotes} category={category} categories={categories} 
            change={handleCategoryChange} addToFavorites={addToFavorites} favoriteQuotes={favoriteQuotes} />}
      </main>
      <Footer />
    </div>
  );
}
export default App;
