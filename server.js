'use strict';

require('svelte/register');

const express = require('express'),
   fs = require('fs'),
   path = require('path'),
   util = require('util'),
   app = express(),
   server = require('http').createServer(app),
   ROOT = __dirname,
   HOST = '0.0.0.0',
   PORT = 3000,
   NODE_ENV = 'production';

const index = require(`${ROOT}/dist/server/index.js`).default;
// template = fs.readFileSync();

app.use('/', express.static(`${ROOT}/dist/client`));

server.on('error', err => console.log(err));

(async _=> {

   app.use('/', (req, res, next) => {

      const data = {appName: 'dashboard'};

      const {head, html, css} = index.render({url: req.url, ...data});

      res.send(`
<!doctype html>
<html>
<head>
   <meta charset='utf8'>
   <meta name='viewport' content='width=device-width'>
   <title>ssr app</title>
   ${head}
</head>
<body>
   <style>
      ${css && css.code ? css.code : ''}
   </style>
   <div id='app'>
      ${html}
   </div>
   <script src='index.js'></script>
</body>
</html>
      `);

      return next();
   });

   server.listen(
      PORT,
      HOST,
      _=> console.log(`Server listen at: ${HOST}:${PORT}, NODE_ENV:${NODE_ENV}`),
   );
})();
