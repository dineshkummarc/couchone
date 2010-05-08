function(doc, req) {
  var ddoc = this,
      mustache = require("vendor/couchapp/lib/mustache"),
      partials = ddoc.templates.partials;

  var context = {main: doc || {}};
  context.page = req.id || 'home';
  context.title = context.page.charAt(0).toUpperCase() + context.page.slice(1);
  context.js = ddoc.js[context.page];

  // XXX: I thought partials inherit the context of their parents?
  var real_context = JSON.parse(JSON.stringify(context));
  ['hd', 'ft', 'sidebar'].forEach(function(x) { context[x] = real_context; });

  partials.main = ddoc.templates[context.page];
  return mustache.to_html(ddoc.templates.interface, context, partials);
  return {headers: {'content-type': 'application/json'}, body: JSON.stringify({ doc:doc, req:req })}; // For debugging
};
