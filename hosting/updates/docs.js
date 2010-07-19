function(doc, req) {
  var ddoc = this;
  var args = {};
  req.body.split('&').forEach(function(pair) {
    pair = pair.split('=');
    args[pair[0]] = pair[1];
  });
  var mustache = require('vendor/mustache/mustache');

  var view = {};
  view.raw = req.body;
  view.subdomain = args.subdomain;
  view.args = args.toSource();

  return [null, {
           "body": mustache.to_html(ddoc.templates.bounce, view)
          }];
};
