//
// Common functionality for views and filters
//

var util = require('js/lib/util');

// Return whether a document is a hosting manager, optionally if it is a particular one.
exports.is_manager = function(doc, id) {
  if(!doc._id)
    return false;
  var match = doc._id.match(/^Manager\/(\w+)$/);
  return match && (id === undefined || match[1] == id);
}

// Return whether a document represents a server.
exports.is_server = function(doc) {
  return doc._id && doc._id.match(/^Server\//);
}

// Return whether a server doc is interesting to the given manager.
exports.server_interesting_to_manager = function(doc, manager_id) {
  if(exports.is_server(doc)) {
    if(doc.state === undefined || doc.state == 'request start')
      // Everybody should see this
      return true;
    if(doc.manager == manager_id)
      return true;
    if(doc.state == 'transfer' && util.is_hash(doc.transfer) && doc.transfer.to == manager_id)
      return true;
  }
  return false;
}
