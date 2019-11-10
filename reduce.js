var http = require('http');
var async = require('async');
var numbers = ['one', 'two', 'three'];

async.reduce(numbers, 0, (memo, item, done) => {
    var body = '';

    http.get(process.argv[2] + "?number=" + item, (res) => {
        res.on('data', (chunk) => {
            body += chunk.toString();
        });

        res.on('end', () => {
            done(null, memo + Number(body));
        });
    }).on('error', done);

}, done);

function done(err, result) {
    if (err) return console.log(err);
    console.log(result);
}
