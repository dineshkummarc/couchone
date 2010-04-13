// this is a simple importer for the existing set of invites

var csv = require('./lib/csv'),
    sys = require('sys'),
    fs = require("fs"),
    path = require('path'),
    couchdb = require("./lib/node-couchdb/lib/couchdb"),
    http = require('http');

var invites_db = couchdb.createClient(5984, 'localhost').db('invites');



fs.readFile(path.join(__dirname, "invite-codes.txt"), function(err, stuff) {
  var codes = JSON.parse(stuff);

  function newInvite(doc) {
    invites_db.saveDoc(codes.pop(), doc, function(err, ok) {
      if (err) {
        newInvite(doc);
      } else {
        sys.puts(JSON.stringify(ok));
      }
    });
  };  
  
  csv.each(path.join(__dirname, "emails.csv"), {sep:','}).addListener("data", function(data) {
    var doc = {
      invite_email : data[0],
      state : "unsent",
    };
    newInvite(doc);
  });
  
  
});

