function(doc, req) {
  var vf = require('js/lib/vf');
  return vf.is_manager(doc, req.query.id);
}
