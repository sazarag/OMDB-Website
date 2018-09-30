var expect = require("chai").expect;
var omdb = "../Service/omdb";
var dt = require('../Service/data');
var constants = require('../Static/constants');

describe("OMDB Service test", function() {
  describe("OMDB getMovies", function() {
    it("returns the movie array", function() {
        omdb.getMovies('batman', 1).then(movieResp => {
            var searchResult = JSON.parse(movieResp);
            expect(searchResult).to.notEqual("ff0000");
        })        
    });
  });

  describe("Hex to RGB conversion", function() {
    it("converts the basic colors", function() {
       var re = dt.get(constants.omdbUrl() + "?apikey=" + constants.omdbApiKey() + "&s=" + 'batman' + "&page=" + 1)
       expect(re).to.equal(null);
    });
  });
});