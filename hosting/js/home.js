$(document).ready(function() {
  var hosting = $.couch.db('db');
  hosting.view('hosting/servers_by_account', {error:lib.flash_error,
    success: function(view) {
      view._class = lib.odd_even;
      view._stamp = function() { return lib.format_ts(this.updated_at); };

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
