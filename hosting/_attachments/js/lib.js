var lib = new (function() {
  var self = this;

  this.flash_error = function(resp) {
    self.error('%o', resp);
    $('#flash').removeClass('none')
               .removeClass('flash_message')
               .addClass('flash_error')
               .text(resp.reason
                 ? 'Error: ' + resp.reason
                 : "Something went wrong. Please tell Jason if it is a big deal.");
  };

  this.flash = function(message) {
    $('#flash').removeClass('none')
               .removeClass('flash_error')
               .addClass('flash_message')
               .text(message);
  };

  // Convert the timestamp format used in the DB to a Javascript date.
  this.format_ts = function(stamp) {
    var mil_re = /(\.\d\d\d)$/;
    var dat = new Date(stamp.replace(mil_re, ' +0000').replace(/-/g, '/'));
    return dat.toGMTString().replace(/ GMT$/, stamp.match(mil_re)[1]); // Put the milliseconds back.
  };

  // Alternate between returning "odd" and "even".
  var val = 'even';
  this.odd_even = function() {
    val = (val == 'even') ? 'odd' : 'even';
    return val;
  };

  this.mustache = function(context) {
    var lines = Array.prototype.slice.apply(arguments, [1]);
    return $($.mustache(lines.join("\n"), context));
  };

  var noop = function() {};
  ['trace', 'dir', 'log', 'debug', 'info', 'warn', 'error', 'exception'].forEach(function(x) {
    self[x] = (console && console[x]) ? console[x] : noop;
  });

})();
