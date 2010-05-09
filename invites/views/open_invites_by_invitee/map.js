function(doc) {
  if(doc.type == 'invite' && doc.state == 'open') {
    emit(doc.invite_email, doc);
  }
}
