const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios')
const router = express.Router();

router.get('/', (req, res) => {
  // return all categories
  const queryText = `SELECT * FROM category ORDER BY name ASC`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
    console.log("My giphy api key:", process.env.GIPHY_API_KEY)

    const apiKey = process.env.GIPHY_API_KEY

    axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=jSVa0O9ielMoIqs7AXdoDYqI5mWksCGT`)
    .then((response) => {
        console.log("Success retrieving trending")
        res.send(response.data)
    })
    .catch((error) => {
        console.log("Error retrieving trending:", error)
        res.sendStatus(500)
    })
})

module.exports = router;
