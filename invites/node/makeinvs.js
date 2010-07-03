// this is a simple importer for the existing set of invites

var csv = require('./lib/csv'),
    request = require("./lib/request"),
    sys = require('sys'),
    fs = require("fs"),
    url = require('url'),
    path = require('path'),
    http = require('http');

var host = 'localhost:5985';
var DB = 'http://coadmin:n60Tj)59.89[@'+host+'/invites';
sys.puts("URL: " + sys.inspect(url.parse(DB)));

fs.readFile(path.join(__dirname, "invite-codes.txt"), function(err, stuff) {
  var words = JSON.parse(stuff),
      codes = [];
  words.forEach(function(w) {
    words.forEach(function(w2) {
      words.forEach(function(w3) {
        if (w != w2 && w2 != w3) {
          var wx = (w+"-"+w2+"-"+w3).replace(" ","-").toLowerCase();
          codes.push(wx);
        }
      })
    });
  });
  codes = codes.sort(function() {return Math.random() - 0.5});
  
  function newInvite(doc, data) {
    sys.puts('Sending: ' + JSON.stringify(doc));
    request.request(DB+"/"+codes.pop(), 'PUT', JSON.stringify(doc),
      null, null, null, function(er, connection, response) {
        if(er) throw new Error(er);
        sys.puts("Response: " + response);
        response = JSON.parse(response);
        sys.puts(data.join(',') + 'http://hosting.couch.io/invite/' + response.id);
      });
  };
  
  var lines = csv.each(path.join(__dirname, process.env.csv || "roundtwo.csv"));

  if(process.env.dry)
    sys.puts('{ "docs": [');
  lines.addListener('end', function() {
    sys.puts(']}');
  });

  lines.addListener("data", function(data) {
    if (data[1].indexOf("@") == -1) {
      if(process.env.verbose)
        sys.puts("Error: " + sys.inspect(data));
    } else {
     var doc = {
       type: "invite",
       invite_email : data[1],
       inviter: 'beta',
       email_sent: true,
       state : "open"
     };

     if(process.env.dry) {
       doc._id = codes.pop();
       sys.puts('  ' + JSON.stringify(doc) + ',');
     } else {
       newInvite(doc, data);
     }
    }
  });

});

