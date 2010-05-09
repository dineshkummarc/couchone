var lib = {

  flash_error: function(resp) {
    $('#flash').text(resp.reason
      ? 'Error: ' + resp.reason
      : "Something went wrong. Please tell Jason if it is a big deal.").addClass('flash');
  },

  // Convert the timestamp format used in the DB to a Javascript date.
  format_ts: function(stamp) {
    var mil_re = /(\.\d\d\d)$/;
    var dat = new Date(stamp.replace(mil_re, ' +0000').replace(/-/g, '/'));
    return dat.toGMTString().replace(/ GMT$/, stamp.match(mil_re)[1]); // Put the milliseconds back.
  },

  // Alternate between returning "odd" and "even".
  odd_even: function() {
    var val = 'even';
    return function() {
      val = (val == 'even') ? 'odd' : 'even';
      return val;
    };
  }(),

  _: undefined
};
