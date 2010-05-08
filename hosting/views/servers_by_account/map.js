function(doc) {
  var parts = doc._id.split('/');
  if(parts[0] == 'Server')
    emit(parts[1], doc);
}
