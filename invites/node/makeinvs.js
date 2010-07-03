// this is a simple importer for the existing set of invites

var csv = require('./lib/csv'),
    request = require("./lib/request"),
    couchdb = require("../../../dependencies/node-couchdb/lib/couchdb")
    sys = require('sys'),
    fs = require("fs"),
    url = require('url'),
    path = require('path'),
    http = require('http');

var host = 'localhost:5985';
var DB = 'http://coadmin:n60Tj)59.89[@'+host+'/invites';
sys.puts("URL: " + sys.inspect(url.parse(DB)));

process.addListener('uncaughtException', function(er) {
  sys.puts("Uncaught exception:\n" + er.stack || er);
});

var client = couchdb.createClient(5985, 'localhost', 'coadmin', 'n60Tj)59.89[');
var invites_db = client.db('invites');

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
  
  var invite_queue = [];

  function process_invite() {
    sys.puts("Queue length: " + invite_queue.length);
    var invite = invite_queue.pop();
    if(!invite) {
      sys.puts("Done.");
      return;
    }

    var doc = invite[0];
    var data = invite[1];

    sys.puts('Sending: ' + JSON.stringify(doc));
    doc._id = codes.pop();
    invites_db.saveDoc(doc, function(er, response) {
        //sys.puts("Response: " + response);
        if(er) {
          sys.puts("ERROR: " + response);
          throw new Error(er);
        }
        //response = JSON.parse(response);
        sys.puts(data.join(',') + ',http://hosting.couch.io/invite/' + response.id);
        setTimeout(process_invite, 100);
        //process_invite();
      });
  };
  
  var lines = csv.each(path.join(__dirname, process.env.csv || "roundtwo.csv"));

  if(process.env.dry)
    sys.puts('{ "docs": [');
  lines.addListener('end', function() {
    sys.puts(']}');
  });

  lines.addListener('end', function() {
    if(!process.env.dry) {
      sys.puts("Processing " + invite_queue.length + " people");
      process_invite();
    }
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
      invite_queue.push([doc, data]);
     }
    }
  });

});

