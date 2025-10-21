// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// API route required by FCC
app.get('/api/whoami', (req, res) => {
  // 1) Get IP address:
  // If behind a proxy/platform the 'x-forwarded-for' header is usually set.
  // It can contain a comma-separated list; take the first entry.
  const xForwardedFor = req.headers['x-forwarded-for'];
  let ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : (req.socket && req.socket.remoteAddress) || req.ip || '';

  // Remove IPv6 "::ffff:" prefix if present (common on localhost/proxy setups)
  ip = ip.replace(/^::ffff:/, '');

  // 2) Get preferred language (first in Accept-Language header)
  const languageHeader = req.headers['accept-language'] || '';
  const language = languageHeader.split(',')[0] || languageHeader;

  // 3) Get software info from User-Agent header.
  // FreeCodeCamp expects the part inside parentheses (e.g. "Windows NT 10.0; Win64; x64").
  const userAgent = req.headers['user-agent'] || '';
  const softwareMatch = userAgent.match(/\(([^)]+)\)/);
  const software = softwareMatch ? softwareMatch[1] : userAgent;

  // Return the result as JSON
  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
