// this is a simple importer for the existing set of invites

var host = 'localhost:5985';
var DB = 'http://coadmin:n60Tj)59.89[@'+host+'/invites';

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
    request.request(DB+"/"+codes.pop(), 'PUT', JSON.stringify(doc),
      null, null, null, function(er, response) {
        if(er) throw new Error(er);
        sys.puts(JSON.stringify(doc));
      });
  };
  
  /* buggy
  if(process.env.dry)
    sys.puts('{docs: [');
  */

  var lines = csv.each(path.join(__dirname, "roundtwo.csv"));
  lines.addListener("data", function(data) {
    if (data[0].indexOf("@") != -1) {
     var doc = {
       type: "invite",
       invite_email : data[0],
       inviter: data[1],
       email_sent: true,
       state : "open"
     };

     if(process.env.dry) {
       doc._id = codes.pop();
       sys.puts('  ' + JSON.stringify(doc) + ',');
     } else {
       newInvite(doc);
     }
    }
  });

  /* buggy
  lines.addListener('end', function() {
    sys.puts('  {}');
    sys.puts(']}');
  });
  */

});

