var dt = require('./data');
var constants = require('./../Static/constants');

module.exports = {
    getMovies: function (keyword, page) {
        return dt.get(constants.omdbUrl() + "?apikey=" + constants.omdbApiKey() + "&s=" + keyword + "&page=" + page);
    }
};
