const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const axios = require('axios');
const router = express.Router();

// get search results
router.get('/search', (req, res) => {
  // take the search query, and takes the request(req above)
  const searchQuery = req.query.searchQuery

  const giphy_api_key = process.env.GIPHY_API_KEY;

  console.log('searchQuery:', searchQuery);
  axios({
    // assign the searchQuery variable at this location in the url: => ?q=${searchQuery}.
    // initiates the new query. q= is required based on giphy's documentation. 
    url: `http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${giphy_api_key}&limit=15`
  }).then((response) => {
    console.log("this is the response data from post server side:", response.data);
    // get the response back from the database with the searched term. data.data is required because of giphy's response. 
    res.send(response.data.data);
  }).catch((error) => {
    console.log('GET /search fail:', error);
    res.sendStatus(500);
  })
});


// POST - add a new favorite
router.post('/', (req, res) => {
  const sqlText = `
    INSERT INTO "favorites" ("url", "category_id")
    VALUES ($1, $2)
  `;
  const sqlValues = [req.body.url, req.body.category_id];

  pool.query(sqlText, sqlValues)
    .then((result) => {
      console.log(`Added image into favorites`);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error POST /api/favorites', error);
      res.sendStatus(500); 
    })
});

// update given favorite with a category id
// req.body should contain a category_id to add to this favorite image
router.put('/:favId', (req, res) => {
  let idToUpdate = req.params.id
  let newCategory = req.body.category_id
  let sqlValues = [newCategory, idToUpdate]

  let sqlQuery = `
  UPDATE "favorites"
    SET "category_id" = $1
    WHERE "id" = $2;
  `;

  pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
      console.log('successful update from PUT /api/favorites', dbRes);
      res.sendStatus(201)
    }).catch(( dbErr)=>{
      console.error('Error PUT /api/favorites', dbErr);
      res.sendStatus(500)
    })
});

// delete a favorite
router.delete('/', (req, res) => {
  pool.query(`DELETE FROM "favorites" WHERE id=$1`, [req.params.id] )
    .then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error DELETE /api/favorites', error);
    res.sendStatus(500);
  })
});

module.exports = router;
