$(document).ready(function() {

  $('#main')
    .transition('fade in', 1500);

  $('#navbar')
    .transition('fade in', 1500);

  $('#goto-home').click(function() {
    $('html, body').animate({
      scrollTop: $('#splash').offset().top
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

  $("#interest-form").on('submit', function(){
    var is_valid_email = function(email) { return (/^.+@.+\..+$/).test(email); };
    // ^^ Yes, this is easy to break. If you're reading this you're probably smart enough to find a way around it
    // but there are a thousand other ways to do malicious things so its not worth our time to stop you :)
    var emailTag = $('#interest-form-email');
    var email = emailTag.val();
    if (is_valid_email(email)) {
      emailTag.val("");
      $.ajax({
        dataType: 'jsonp',
        url: "http://getsimpleform.com/messages/ajax?form_api_token=fe4ccc4ce76bde458f7fbdaf077b89ca",
        data: {
          email: email
        }
      });
      $(this).find("label, input").transition('fade out', 100);
      $(this).find(".thankyou").transition('fade in', 100);
    } else {
      // :(
    }
    return false;
  });
});
