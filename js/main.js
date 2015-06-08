$(document).ready(function() {

  $('#main')
    .transition('fade in', 1500);

  $('#navbar')
    .transition('fade in', 1500);

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

  $('.row').click(function() {
    if ($(this).find('.answer').hasClass('hidden')) {
      $(this).find('.answer').transition('fade down in', 300);
    } else {
      $(this).find('.answer').transition('fade down out', 300);
    }
  });
});
