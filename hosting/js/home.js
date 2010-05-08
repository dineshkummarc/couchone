$(document).ready(function() {
  var error = function(resp) {
    $('#flash').text(resp.reason
      ? 'Error: ' + resp.reason
      : "Something went wrong. Please tell Jason if it is a big deal.").addClass('flash');
  };

  var hosting = $.couch.db('db');
  //hosting.allDocs({startkey:'Server/', endkey:'Server0', include_docs:true,
  $.ajax({url:hosting.uri + '_design/hosting/_list/servers/servers_by_account', error:error,
    success: function(res) {
      var ul = $('ul#servers');//.html('');
      res.forEach(function(row) {
        ul.append($('<li>' + row.html + '</li>'));
      });
    }
  });
});
