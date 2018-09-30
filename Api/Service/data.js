var Request = require("request");

module.exports = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            Request.get(url, (error, response, body) => {
                if (error) {
                    reject(error);
                    return console.dir(error);
                }
                resolve(body);
            })
        })
    },

    post: function (url, sendObj) {
        return Request.post({
            "headers": { "content-type": "application/json" },
            "url": url,
            "body": sendObj
        }, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            console.dir(JSON.parse(body));

            return JSON.parse(body);
        });;
    }
};


