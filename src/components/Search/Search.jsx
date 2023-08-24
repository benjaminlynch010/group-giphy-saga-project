import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Search() {
  const dispatch = useDispatch();
  const gifData = useSelector((state) => state.gifData);
  console.log("Gif Data :", gifData);

  const getGifs = () => {
    dispatch({ type: "GET_GIFS", payload: gifData });
  };

  useEffect(() => {
    getGifs();
  }, []);

  return (
    <>
      <form>
        <div>
          <input
            type="search"
            id="mySearch"
            name="q"
            placeholder="Search gifs"
            size="30"
          />
          <button>Search</button>
          {/* {gifData.map((giphyItem, index) => (
            <img
              key={index}
              src={giphyItem.images.original.url}
              alt="GIF HERE"
            />
          ))} */}
        </div>
      </form>
    </>
  );
}

export default Search;
