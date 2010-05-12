$(document).ready(function() {
  $('form#logout').submit(function(ev) {
    ev.preventDefault();
    var reload = function () { window.location.reload(); };
    $.ajax({
      type   : 'DELETE',
      url    : '/_session',
      success: reload,
      error  : reload
    });
  });
});

