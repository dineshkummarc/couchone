$(document).ready(function() {
  var invites = $.couch.db('invites_db');

  var do_view = function(view_name) {
    invites.view('invites/' + view_name, {error:lib.flash_error,
      success: function(view) {
        view._class = lib.odd_even;
        view._stamp = function() { return lib.format_ts(this.updated_at); };
        view._email = function() { return this.signup_email || this.invite_email; };
        view._state = function() { return {open: 'Waiting on user', ready: 'Done', request: 'Requested'}[this.state]; };
        view._mesg = function() {
          if(this.user_message) {
            var m = this.user_message.replace(/\n/g, '');
            return (m.length < 15) ? m : m.slice(0, 15) + '...';
          }
        };

        $('table#invites tbody').html(lib.mustache(view,
          '{{#rows}}',
            '<tr class="{{_class}}">',
              '{{#value}}',
                '<td>{{_email}}</td>',
                '<td>{{_state}}</td>',
                '<td>{{subdomain}}</td>',
                '<td>{{_mesg}}</td>',
              '{{/value}}',
            '<tr>',
          '{{/rows}}'
        ));
      }
    });
  };

  $('#select_view').change(function() {
    do_view($(this).val());
  });
  $('#select_view').change();
});
