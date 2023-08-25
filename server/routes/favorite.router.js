const express = require('express');
const pool = require('../modules/pool');

const axios = require('axios');
const router = express.Router();

// get search results
router.get('/search', (req, res) => {
  // take the search query, and takes the request(req above)
  const searchQuery = req.query.searchQuery

  const giphy_api_key = process.env.jSVa0O9ielMoIqs7AXdoDYqI5mWksCGT

  console.log('searchQuery:', searchQuery);
  axios({
    // assign the searchQuery variable at this location in the url: => ?q=${searchQuery}.
    // initiates the new query. q= is required based on giphy's documentation. 
    url: `http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=jSVa0O9ielMoIqs7AXdoDYqI5mWksCGT&limit=15`
  }).then((response) => {
    console.log("this is the response data from post server side:", response.data);
    // get the response back from the database with the searched term. data.data is required because of giphy's response. 
    res.send(response.data.data);
  }).catch((error) => {
    console.log('GET /search fail:', error);
    res.sendStatus(500);
  })
});


// add a new favorite
router.post('/', (req, res) => {
  res.sendStatus(200);
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
