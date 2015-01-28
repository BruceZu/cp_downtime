/* globals require, console */
var http = require("http");
var fs   = require("fs");

function handle200(req, res, data) {
  res.writeHeader(200, { "Content-Type": "text/html" });

  if (req.method === "POST") {
    var msg = "CodePen is temporarily down for maintenance.";
    var postResponse = { "success": false, "errors": [msg] };
    res.write(JSON.stringify(postResponse));
  } else {
    res.write(data);
  }

  res.end();
}

function handle500(req, res) {
  res.writeHeader(500, { "Content-Type": "text/html" });

  var msg = "CodePen is temporarily down for maintenance.";
  var postResponse = { "success": false, "errors": [msg] };

  res.write(JSON.stringify(postResponse));
  res.end();
}

fs.readFile("./down.html", function(err, data) {
  "use strict";
  console.log("Starting server\n");

  http.createServer(function (req, res) {
    var url = req.url || "";

    /*********************************************
    These URLs get 500 responses

    /subscription/stripe/callback
    /comment/spam/mark/queue/#{@comment.id}
    /comment/spam/approve/queue/#{@comment.id}
    /admin/worker/run
    /oauth/goog/files/delete-expired
    /pen/add_pick_from_queue
    /pen/screenshot/update
    ***********************************************/

    if (url.match(/^(\/subscription\/stripe\/callback|\/comment\/spam\/mark\/queue|\/comment\/spam\/approve\/queue|\/admin\/worker\/run|\/oauth\/goog\/files\/delete-expired|\/pen\/add_pick_from_queue|\/pen\/screenshot\/update)/)) {
      handle500(req, res);
    } else {
      handle200(req, res, data);
    }

  }).listen(3000);
});
