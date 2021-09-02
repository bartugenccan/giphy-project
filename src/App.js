import React from "react";
import "./App.css";

//Component
import Loader from "./component/Loader/Loader";

//Hooks
import { useState, useEffect } from "react";

//Axios
import axios from "axios";

const API_KEY = "ABvWT04d2q1KXaAqOQL7rrGw12ZlJW3w";

function App() {
  //A useState hook to make search the input value
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //When the component renders, useEffect starts working and shows the trending gifs
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const trending = await axios.get(
          "https://api.giphy.com/v1/gifs/trending",
          {
            params: { api_key: API_KEY, limit: 20 },
          }
        );

        setGifs(trending.data.data);
      } catch (err) {
        console.log(err, "Error");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  //Fetching the data from GIPHY API
  const handleSearch = async (e) => {
    //This code prevents the page reload after the user presses search button
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: API_KEY,
          //q param is search because it searches the value the user wrote in the input
          q: search,
          limit: 20,
        },
      });

      setGifs(response.data.data);
      setSearch("");
    } catch (err) {
      console.log(err, "Error");
    }

    setIsLoading(false);
  };

  const renderedGifs = () => {
    if (isLoading) {
      return <Loader />;
    }

    return gifs.map((gif) => (
      <div key={gif.id} className="gif">
        <img src={gif.images.fixed_height.url} alt=".." />
      </div>
    ));
  };

  return (
    <div className="whole-page">
      <div className="search-bar">
        <input
          type="text"
          className="form-control search-input m-auto"
          placeholder="Search Gifs"
          value={search}
          //onChange for getting the input value real time.
          onChange={(e) => setSearch(e.target.value)}

        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="container gifs">{renderedGifs()}</div>
    </div>
  );
}

export default App;
