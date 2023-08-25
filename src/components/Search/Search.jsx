import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Search() {
  const dispatch = useDispatch();
  const gifReducer = useSelector(store => store.gifReducer)
  console.log("Gif Data :", gifReducer);
  const [searchInput, setSearchInput] = useState('');

// Send dispatch to SAGA_FETCH_SEARCH using searchQuery 
const handleSubmit = (event) => {
  event.preventDefault();
  
  dispatch({
    type: 'SAGA_FETCH_SEARCH',
    payload: searchInput
  }) 
}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="search"
            id="mySearch"
            value={searchInput}
            placeholder="Search gifs"
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <div>
        {/* map over the results array and render each image */}
        {gifReducer.map((image) => (
          // Use src={image.images.fixed_height.url} for the desired image size
          <img key={image.id} src={image.images.fixed_height.url} alt="GIF" />
        ))}
      </div>
    </>
  );

}
export default Search;
