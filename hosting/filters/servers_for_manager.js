function(doc, req) {
  var vf = require('js/lib/vf');
  return vf.server_interesting_to_manager(doc, req.query.id);
}
