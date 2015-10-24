var breakWidth = 768;

$(document).ready(function() {

  $('#main')
    .transition('fade in', 1500);

  var $bodytag = $('html, body');
  var $tags = $('#goto-splash, #goto-blurb, #goto-faq, #goto-register, #goto-sponsor');
  $tags.click(function(e) {
    var elementName = e.target.id.substr(5);
    if ($(window).width() <= breakWidth) {
      $bodytag.animate({
        scrollTop: $('#'+elementName).offset().top
      }, 800);
    } else {
      $bodytag.animate({
        scrollTop: $('#'+elementName).offset().top - 45
      }, 800);
    }
  });

  hideAnswers();

  $('#interest-form').on('submit', function(){
    var is_valid_email = function(email) { return (/^.+@.+\..+$/).test(email); };
    // ^^ Yes, this is easy to break. If you're reading this you're probably smart enough to find a way around it
    // but there are a thousand other ways to do malicious things so its not worth our time to stop you :)
    var emailTag = $('#interest-form-email');
    var email = emailTag.val();
    if (is_valid_email(email)) {
      emailTag.val('');
      $.ajax({
        dataType: 'jsonp',
        url: window.location.protocol + '//getsimpleform.com/messages/ajax?form_api_token=fe4ccc4ce76bde458f7fbdaf077b89ca',
        data: {
          email: email
        }
      });
      $(this).find('label, input').transition('fade out', 500, function() {
        $('.thankyou').transition('fade in', 500);
      });

    } else {
      // :(
    }
    return false;
  });

  //code for hiding answers
  $('.question').on('click', function() {
      if ($(window).width() <= breakWidth) {
        $question = $(this);
        $answer = $question.next();
        $answer.slideToggle(200);
        $question.children().toggleClass('angle-rotated');
      }
    })

  var resizeTimeout;
  var resizeNavbarTimeout;
  $(window).on('resize', function() {
    clearTimeout(resizeTimeout);
    clearTimeout(resizeNavbarTimeout);
    resizeTimeout = setTimeout(hideAnswers(), 200);
    resizeNavbarTimeout = setTimeout(recalculateNavbarPosition(), 250);
  });

  /* Following Nav Bar */
  var scrollTimeout;
  $(window).on('scroll', function() {
    if ($(window).width() >= 786) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkAndMoveNavbarPosition(), 250);
    }
  });

  /* move the nav bar as appropriate */
  var isFixed = false;
  var navbarHeight;
  var deltaLocation;
  recalculateNavbarPosition();
  function checkAndMoveNavbarPosition() {
    if (!isFixed && $(window).scrollTop() > deltaLocation) {
      $('#navbar').stop(true).hide();
      $('#navbar').addClass('fixed');
      isFixed = true;
      $('#navbar').show();
    }
    else if (isFixed && $(window).scrollTop() < deltaLocation) {
      $('#navbar').stop(true).css("display", "none");
      $('#navbar').removeClass('fixed');
      isFixed = false;
      $('#navbar').show();
    }
  }

  function recalculateNavbarPosition() {
    navbarHeight = $('#navbar').outerHeight();
    deltaLocation = $('#splash').outerHeight() - navbarHeight;
  }
});


//run on window load and resize
function hideAnswers() {
  if ($(window).width() <= breakWidth) {
    $('.answer').css('display','none');
    $('.question').addClass('question-hidden');
    $('.angle').css('display', 'inline-block');
  }
  else {
    $('.answer').css('display','block');
    $('.question').removeClass('question-hidden');
    $('.angle').css('display', 'none');
    $('.angle').removeClass('angle-rotated');
  }
}
