/* globals require, console */
var http = require("http");
var fs   = require("fs");

fs.readFile("./down.html", function(err, data) {
  // console.log("Listening on port 8080");

  "use strict";

  http.createServer(function (req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }).listen(3000);
});