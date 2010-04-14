function(doc, req) {
  if (doc) {
    return {
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(doc)
    }
  } else {
    throw(1)
  }
};
