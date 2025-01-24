const http = require('http');
const fs = require('fs');

//creates readstream to file path
const readStream = fs.createReadStream('./document/blog3', { encoding: 'utf8' });

//creates writestream to file path
const writeStream = fs.createWriteStream('./document/blog4');

// readStream.on('data', function(chunk) {
//     console.log(chunk);
// })

readStream.pipe(writeStream);

const _ = require('lodash');

const server = http.createServer(function(req, res) {
    let path = './views/';

    let rand_num = _.random(0, 20);

    _.once(function() {
        console.log('this cannot run more than once');
    })

    console.log(rand_num);

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        case '/contact':
            res.statusCode = 200;
            path += 'contact.html';
            break;
        default:
            path += '404.html';
            break;
    }

    console.log(path + ' - path');

    console.log(req.url);
    // console.log('requesty made');
    // console.log(req);
    // res.setHeader('Content-type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    let path_format = './views/index.html';

    fs.readFile(path, function(err, data) {
        if (err) {
            console.log('there is an error');
            res.end();
        } else {
            console.log('some new shit');
            // console.log(data.toString());
            res.write(data);
            res.end();
        }
    })
})

server.listen(3000, 'localhost', function() {
    console.log('the server is running');
})