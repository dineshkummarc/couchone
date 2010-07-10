function(doc) {
  var exports = {};
  var vf = exports;

  // !code js/lib/vf.js

  if(vf.is_manager(doc))
    emit(doc.updated_at, doc._id);
}
