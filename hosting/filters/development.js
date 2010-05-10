function(doc, req) {
  var keep = ['jhs', 'kriesse', 'mikeal'];

  if(doc._id.split('/')[0] == 'Server') {
    for (var a in keep)
      if(doc._id == 'Server/' + keep[a])
        return true;
    return false;
  }
  return true;
}
