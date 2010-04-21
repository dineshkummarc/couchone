function(doc, req) {
  return doc.type && (doc.type == 'invite');
};
