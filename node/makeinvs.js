// this is a simple importer for the existing set of invites

var csv = require('./lib/csv'),
    request = require("./lib/request"),
    sys = require('sys'),
    fs = require("fs"),
    path = require('path'),
    http = require('http');


fs.readFile(path.join(__dirname, "invite-codes.txt"), function(err, stuff) {
  var words = JSON.parse(stuff),
      codes = [];
  words.forEach(function(w) {
    words.forEach(function(w2) {
      if (w != w2) {
        var wx = (w+"-"+w2).replace(" ","-").toLowerCase();
        codes.push(wx);
      }
    });
  });
  codes = codes.sort(function() {return Math.random() - 0.5});
  
  function newInvite(doc) {
    request.request("http://localhost:5984/invites/"+codes.pop(), 'PUT', JSON.stringify(doc),
      null, null, null, function(er, response) {
        // warning, this code never runs due to node bug
        sys.puts(JSON.stringify(arguments));
        // todo retry save in case of error
      });
  };
  
  csv.each(path.join(__dirname, "emails.csv"), {sep:','}).addListener("data", function(data) {
    if (data[0].indexOf("@") != -1) {
     var doc = {
       invite_email : data[0],
       state : "unsent"
     };
     newInvite(doc);
    }
  });
  
  
});

