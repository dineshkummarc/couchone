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

  $('#new_invite').submit(function(ev) {
    ev.preventDefault();
    var emails = {
      inviter: $('#new_invite input[name=inv_inviter]').val(),
      invitee: $('#new_invite input[name=inv_invitee]').val()
    };

    if(emails.inviter == '@couch.io' || emails.invitee == '') {
      lib.flash_error({reason:"You did not complete the form correctly. Try again."});
      return;
    }

    var send = function send (trial, result) {
      lib.debug('Send trial %d with %o', trial, result);
      if(trial > 3) {
        lib.flash_error(result);
        return;
      }

      var doc = {
        _id : $.couch.newUUID(),
        type : "invite",
        state : "open", // Already approved.
        email_sent: true, // They will go out in bulk so just wait for them.
        suggested_by : emails.inviter,
        invite_email : emails.invitee,
        user_message : $.mustache("This invite was created by {{inviter}} for {{invitee}}", emails)
      };

      invites.saveDoc(doc, {
        error: function(st, er, reason) { send(trial+1, {status:st, error:er, reason:reason}); },
        success: function () {
          done = true;
          lib.flash($.mustache('Invitation sent! <a href="{{url}}">See it here</a>.', {url:lib.invite_url(doc)}));
          $('#select_view').change();
        }
      });
    };
    send(1);
  });
});
