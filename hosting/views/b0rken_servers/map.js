function(doc) {
  if(doc._id.slice(0, 7) == 'Server/' && doc.state != 'running')
    emit(doc._id.slice(7), doc.state);
}
