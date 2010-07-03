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
  } else if (req.method == "POST") {
    log(req);
    var newDoc;

    if(req.headers['Content-Type'] == 'application/json') {
      newDoc = JSON.parse(req.body);
    } else {
      var args = {};
      req.body.split('&').forEach(function(pair) {
        pair = pair.split('=');
        args[pair[0]] = pair[1];
      })
      newDoc = {"_id": "Server/"+args.subdomain, "creation": args};
      return [newDoc, {json: {id: newDoc._id}}];
    }
  }
};
