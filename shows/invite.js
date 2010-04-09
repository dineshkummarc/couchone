function(doc, req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  if (doc) {
    doc.header = {}; // for partials
    doc.footer = {};
    if (doc.state == "open") {
      doc.email_length = (doc.invite_email && doc.invite_email.length) || 30;
      return mustache.to_html(ddoc.templates.invite, doc, ddoc.templates.partials);    
    } else if (doc.state == "ready") {
      doc.utils = "http://"+doc.subdomain+".couchone.com/_utils/";
      return mustache.to_html(ddoc.templates.ready, doc, ddoc.templates.partials);    
    } else if (doc.state == "request") {
      return mustache.to_html(ddoc.templates.requested, doc, ddoc.templates.partials);      
    } else {
      return mustache.to_html(ddoc.templates.progress, doc, ddoc.templates.partials);    
    }
  } else {
    return mustache.to_html(ddoc.templates.request, {header : {}, footer: {}}, ddoc.templates.partials);    
  }
};
