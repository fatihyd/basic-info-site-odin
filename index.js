const http = require('http');
const url = require('url');
const fs = require('fs');


function doOnIncoming(req, res) {
    let fullURL = req.url;
    let urlObj = url.parse(fullURL, true);
    let pageToGoTo = "." + urlObj.pathname + ".html";
    if (urlObj.pathname == "/") { pageToGoTo = "./index.html"; }

    fs.readFile(pageToGoTo, function(error, data) {
        if (error) {
            fs.readFile('./404.html', function(innerError, innerData) {
                res.writeHead(404, { 'content-type': 'text/html' });
                res.write(innerData);
                res.end();
            });
            return;
        }

        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(data);
        res.end();
    });
}

const server = http.createServer(doOnIncoming);
server.listen(8080);
