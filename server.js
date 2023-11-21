// const express = require('express');
// const next = require('next');
// const basicAuth = require('basic-auth');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const auth = function (req, res, next) {
//   const credentials = basicAuth(req);

//   if (credentials && credentials.name === process.env.BASIC_AUTH_USERNAME && credentials.pass === process.env.BASIC_AUTH_PASSWORD) {
//     return next();
//   } else {
//     res.setHeader('WWW-Authenticate', 'Basic realm="example"');
//     res.status(401).end('Access denied');
//   }
// };

// app.prepare().then(() => {
//   const server = express();

//   server.use(auth);

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });

