
var express = require("express");
var cors = require('cors')
var app = express();
var url = require('url');
var omdb = require('./omdb')
const responseTime = require('response-time')
const redis = require('redis');

// create and connect redis client to local instance.
const client = redis.createClient();
// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

app.use(cors())
// use response-time as a middleware
app.use(responseTime());

app.get('/api/search', (req, res) => {
  // Extract the query from url and trim trailing spaces
  
  const query = url.parse(req.url, true).query;
  
  // Try fetching the result from Redis first in case we have it cached
  return client.get(`omdb:${query.keyword}`, (err, result) => {
    // If that key exist in Redis store
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else {
      // Key does not exist in Redis store      
      // Fetch directly from Omdb API
      try {
        getMovies(client, query.keyword, res, false);
      } catch (error) {
        console.log(error);
      }
    }
  });
});

app.get('/api/cache/refresh', (req, res) => {
  // get all cached keys
  client.keys('*', (err, keys) => {
    
    keys.forEach(cachedKey => {
      // update redis from Omdb API
      try {
        getMovies(client, cachedKey.replace('omdb:', ''), res, true);
      } catch (error) {
        console.log(error);
      }
    })
    res.send("forceUpdate");
    res.end();
  });
});

async function getMovies(redisClient, keyword, res, isForcedUpdate) {
  const cacheTime = 60;
  
  // query page 1 first
  await omdb.getMovies(keyword, 1).then(respPage1 => {

    var searchResult = JSON.parse(respPage1);

    // get second page reques if respPage1 = 10
    if (searchResult.Response === "True" && searchResult.Search.length === 10) {
      omdb.getMovies(keyword, 2).then(respPage2 => {
        // combine page 1 and page 2 results
        var page2SearchResult = JSON.parse(respPage2).Search;
        if (page2SearchResult) {
          searchResult.Search = searchResult.Search.concat(page2SearchResult);
        }
        // Save the omdb API response in Redis store
        redisClient.setex(`omdb:${keyword}`, cacheTime, JSON.stringify(searchResult));

        if (!isForcedUpdate) {
          res.send(searchResult);
          res.end();
        }
        
      }).catch(er => {
        console.log(er);
        res.end(er);
      });
    } else {
      redisClient.setex(`omdb:${keyword}`, cacheTime, JSON.stringify(searchResult));
      res.send(searchResult);
      res.end();
    }
  }).catch(er => {
    console.log(er);
    res.end(er);
  });
}

app.listen(3001);
