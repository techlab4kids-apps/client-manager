import {app} from "./app";

const PORT = 5500;
const server = app.listen(PORT, () => console.log(`Client manager app listening on port ${PORT}`));

module.exports = server;
