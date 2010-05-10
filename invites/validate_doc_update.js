function(newDoc, oldDoc, userCtx) {
  if ((oldDoc || newDoc).type == 'invite') {
    if (oldDoc) {
      // only the deploy bot can edit non-open docs
      if (userCtx.roles.indexOf("deploy") == -1) {
        if (oldDoc.state != "open") {
          throw({forbidden : "This invite code is already used!"})
        } else {
          // accepting an invite must be an rsvp
          if (newDoc.state != "rsvp") {
            throw({forbidden : "You must save a valid rsvp!"})            
          }
        }
      }
    } else {
      if (userCtx.roles.indexOf("deploy") == -1 && userCtx.roles.indexOf("_admin") == -1) {
        // anyone can create a request
        if (newDoc.state != "request") {
          throw({forbidden : "This is not a valid invite request!"})
        }
      }
    }
    // validate the invite fields
  }
};

// deploy can move the invite to "ready" when the server is up
