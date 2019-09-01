const http = require('http');
const app = require('../app');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
