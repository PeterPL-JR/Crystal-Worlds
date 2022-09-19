const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const server = http.createServer(app);
const PORT = process.env.PORT || 1024;

app.use(express.static(
    path.join(__dirname, "/")
));

server.listen(PORT, function() {
    console.log("Server is listening on port " + PORT);
});