var http = require('http');
var async = require('async');
var URLS = process.argv.slice(2);

async.map(URLS, function (item, done) {
        var body = '';
        http.get(item, (response) => {
            response.on('data', (chunk) => {
                body += chunk.toString();
            });

            response.on('end', () => {
                return done(null, body);
            });
        });
    },
    function (err, results) {
        if (err)
            return console.log(err);
        // results is an array of the response bodies in the same order
        console.log(results);
    });
