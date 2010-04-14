function(doc, req) {
  if (req.method == "GET") {
    return [null, {
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(doc)
    }];
  } else if (req.method == "PUT") {
    var newDoc = JSON.parse(req.body);
    return [newDoc, {json : {id : newDoc._id}}];
  }
};
