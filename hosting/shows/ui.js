function(doc, req) {
  var ddoc = this,
      mustache = require("vendor/mustache/mustache"),
      util     = require('js/lib/util'),
      partials = ddoc.templates.partials;

  log(doc);
  util.dir(req);
  if(req.userCtx.roles.indexOf('_admin') == -1 && req.userCtx.roles.indexOf('deploy') == -1) {
    partials.main = ddoc.templates.login;
    return mustache.to_html(ddoc.templates.interface,
                           {hd:{}, main:{}, sidebar:{}, ft:{}},
                           partials);
  }

  var context = {main: doc || {}};
  context.page = req.id || 'home';
  context.userCtx = req.userCtx;
  context.title = context.page.charAt(0).toUpperCase() + context.page.slice(1);
  context.js = ddoc.js[context.page];

  // XXX: I thought partials inherit the context of their parents?
  var real_context = JSON.parse(JSON.stringify(context));
  ['hd', 'ft', 'sidebar'].forEach(function(x) { context[x] = real_context; });

  partials.main = ddoc.templates[context.page];
  return mustache.to_html(ddoc.templates.interface, context, partials);
  return {headers: {'content-type': 'application/json'}, body: JSON.stringify({ doc:doc, req:req })}; // For debugging
};
