$(document).ready(function() {
  var error = function(resp) {
    $('#flash').text(resp.reason
      ? 'Error: ' + resp.reason
      : "Something went wrong. Please tell Jason if it is a big deal.").addClass('flash');
  };

  var hosting = $.couch.db('db');
  hosting.view('hosting/servers_by_account', {error:error,
    success: function(view) {
      // Add a pretty date formatter to the scope.
      view._stamp = function(text, render) {
         var mil_re = /(\.\d\d\d)$/;
         var stamp = new Date(this.updated_at.replace(mil_re, ' +0000').replace(/-/g, '/'));
         return stamp.toGMTString().replace(/ GMT$/, this.updated_at.match(mil_re)[1]); // Put the milliseconds back
      };

      var cls = 'even';
      view._class = function(text, render) {
        cls = (cls == 'even') ? 'odd' : 'even';
        return cls;
      };

      $('table#servers tbody').html($($.mustache([
        '{{#rows}}',
          '<tr class="{{_class}}">',
            '<td>{{key}}</td>',
            '{{#value}}',
              '<td>{{state}}</td>',
              '<td>{{_stamp}}</td>',
              '<td>{{pid}}</td>',
              '<td>{{port}}</td>',
            '{{/value}}',
          '<tr>',
        '{{/rows}}',
      ].join('\n'), view)));
    }
  });
});
