$(document).ready(function(){
  $('.main')
      .transition('fade in');
  $('.ui.dropdown')
      .dropdown();

  var $dimmer = $('.ui.page.dimmer');

  window.dimmerMessage = function(title, subtitle, callback, timeout) {
    $dimmer.find('h1').html(title);
    $dimmer.find('h2').html(subtitle);
    $dimmer
      .dimmer('show');
    setTimeout(function(){
      $dimmer.dimmer('hide');
      callback();
    }, timeout)
  }

});
