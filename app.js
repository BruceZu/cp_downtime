/* globals require, console */
var http = require("http");
var fs   = require("fs");

fs.readFile("./down.html", function(err, data) {
  "use strict";

  http.createServer(function (req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });

    if (req.method === "POST") {
      var msg = "CodePen is temporarily down for maintenance.";
      var postResponse = { "success": false, "errors": [msg] };
      res.write(JSON.stringify(postResponse));
    } else {
      res.write(data);
    }
    res.end();
  }).listen(3000);
});