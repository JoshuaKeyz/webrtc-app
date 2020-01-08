// Primary file for the API
const http = require('http');
const https = require('https');
const url = require('url');
const port = 3000;
const httpServer = http.createServer((req, res)=>{
    // Get the url from the request
    const unparsedReqUrl = url.parse(req.url, true);
    const trimmedPath = unparsedReqUrl.pathname.replace(/^\/+|\/+$/g, '');
    res.end('Hello World  ' + trimmedPath);
});

httpServer.listen(port, ()=>{
    console.log(`app listening at port ${port}`)
});