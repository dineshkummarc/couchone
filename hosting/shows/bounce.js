function(doc, req) {
  return {
    "code": 302,
    "headers": {"Location": "http://www.couch.io/get"},
    "body": "Moved to <a href='http://www.couch.io/get'>http://www.couch.io/get</a>",
  }
}
