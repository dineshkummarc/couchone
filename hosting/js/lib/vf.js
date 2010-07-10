//
// Common functionality for views and filters
//

exports.is_manager = function(doc) {
  return doc._id && doc._id.indexOf('Manager/') == 0;
}
