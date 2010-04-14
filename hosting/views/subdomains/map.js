function(doc) {
  if (doc._id.indexOf("Server") == 0) {
    var parts = doc._id.split("/");
    emit([parts[1]], null);
  }
}