function(doc) {
  if(doc.type == 'invite') {
    emit(doc.invite_email, doc._id);
  }
}
