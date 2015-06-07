$(document).ready(function() {

  $('#main')
    .transition('fade in', 1000);

  $('#navbar')
    .transition('fade in', 1000);

  $('#goto-home').click(function() {
    $('html, body').animate({
      scrollTop: $('#main').offset().top
    }, 1000);
  });

  $('#goto-about').click(function() {
    $('html, body').animate({
      scrollTop: $('#blurb').offset().top
    }, 1000);
  });

  $('#goto-faq').click(function() {
    $('html, body').animate({
      scrollTop: $('#faq').offset().top
    }, 1000);
  });

  // $('.question').click
});
