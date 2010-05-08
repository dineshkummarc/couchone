function(head, req) {
  var ddoc = this,
      row,
      mustache = require("vendor/mustache/mustache");

  start({headers: {"content-type": "application/json"}});

  var rows = [];
  while(row = getRow()) {
    row.account = row.id.split('/')[1];
    row.doc     = row.value;
    rows[rows.length] = {doc:row.value, html:mustache.to_html(ddoc.templates.partials.server, row)};
  }

  send(JSON.stringify(rows));
};
