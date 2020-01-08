/**
 * dev dependencies
 */
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

/**
 * modules
 */
const router = require('./router');

// local variables
const port = 3000;
// Create Server
const httpServer = {};
httpServer.instance;
httpServer.init = (db) => {
    console.log(db);
    httpServer.instance = http.createServer((req, res) => {

        // Process the route path
        const path = url.parse(req.url, true);
        // const path2 = new url.URL(req.url);
        const untrimmedPath = path.pathname
        const trimmedPath = untrimmedPath.replace(/^\/+|\/+$/g, '')

        // get the Method of call
        const method = req.method.toLowerCase();

        // get the headers of the call
        const headers = req.headers;

        //get the query string object of the call
        const queryStringObj = path.query;

        // get the payload of the call
        let data = '';
        let stringDecoder = new StringDecoder('utf-8');
        req.on('data', (chunk) => {
            data += stringDecoder.write(chunk)
        })
        req.on('end', () => {
            data += stringDecoder.end();
            let jsonData;
            if (data.length > 0) {
                jsonData = JSON.parse(data);
            } else {
                jsonData = {};
            }
            const requestPayload = {
                path: trimmedPath,
                method,
                headers,
                queryStringObj,
                payload: jsonData
            };
            const choosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router['notFound'];

            choosenHandler(requestPayload, (statusCode, payload) => {
                if (!payload) {
                    payload = {};
                }
                if (!statusCode) {
                    statusCode = 200;
                }
                console.log('Over here');
                res.writeHead(statusCode)
                res.end(JSON.stringify(payload));
            });
        })
    });


    httpServer.instance.listen(port, () => {
        console.log(`Server started on localhost:${port}`)
    })


    return httpServer.instance;
}


module.exports = httpServer;