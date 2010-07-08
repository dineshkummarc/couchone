function(doc) {
  if(doc._id.slice(0, 7) == 'Server/') {
    if(doc.state == 'running')
      emit(doc.port, null);
    else
      emit(-doc.port, null);
  }
}
