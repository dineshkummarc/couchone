function(doc, req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  return mustache.to_html("In mustache", {});
};
