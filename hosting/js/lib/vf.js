//
// Common functionality for views and filters
//

// Return whether a document is a hosting manager, optionally if it is a particular one.
exports.is_manager = function(doc, id) {
  if(!doc._id)
    return false;
  var match = doc._id.match(/^Manager\/(\w+)$/);
  return match && (id === undefined || match[1] == id);
}
