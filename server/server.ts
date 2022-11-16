import {app, httpServer} from "./app";


const PORT = 5500;
const server = app.listen(PORT, () => console.log(`Client manager app listening on port ${PORT}`));

module.exports = server;


const port = 1337
httpServer.listen(port)
console.log('WebSocket server listening on port ' + port + '...')