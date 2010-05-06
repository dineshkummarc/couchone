function(doc) {
  if(doc.type == 'invite' && doc.state == 'request') {
    emit(doc.invite_email, doc._id);
  }
}
