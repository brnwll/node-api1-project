const server = require("./api/server");

const port = 9000;

// START YOUR SERVER HERE
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

/*

EXAMPLE PROJECT

const server = require('./api/server')
const PORT = 9000

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})


*/
