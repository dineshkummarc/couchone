function(doc, req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");

  if(!doc)
    return mustache.to_html(ddoc.templates.index, {});
};
