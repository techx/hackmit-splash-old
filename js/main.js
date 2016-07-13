var breakWidth = 767;
var dragH = false;
var dragA = false;
var dragC = false;
var dragK = false;
var startX; 
var startY;

$(document).ready(function() {

  var today = new Date();
  if (today.getDate() == 1 && today.getMonth() == 3) {
    $('body').addClass('foolsday');
  }

  $('#main')
    .transition('fade in', 1500);

  var $bodytag = $('html, body');
  var $tags = $('#goto-about, #goto-faq, #goto-reg-now');
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

  $('form').on('submit', function(e){
    e.preventDefault();

    var is_valid_email = function(email) { return (/^.+@.+\..+$/).test(email); };
    // ^^ Yes, this is easy to break. If you're reading this you're probably smart enough to find a way around it
    // but there are a thousand other ways to do malicious things so its not worth our time to stop you :)
    var emailTag = $('#reg-now-form-email');
    var email = emailTag.val();
    console.log(email);
    if (is_valid_email(email)) {
      emailTag.val('');
      $.ajax({
        dataType: 'jsonp',
        url: window.location.protocol + '//getsimpleform.com/messages/ajax?form_api_token=2933d4eed6567f30071904ed66a75ff9',
        data: {
          email: email
        }
      });

      $('form').animate({height: 'hide'}, 500, function() {
        $('.thankyou').animate({height: 'show'}, 500);
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

  $('.splash-img').attr('draggable', 'false'); 

  var svgDim = parseInt($('.splash-img').css('height'));
  var svgOffset = $('.splash-img').offset();
  $('.drag-target-H').css('top', -svgOffset.top+svgDim/4+'px');
  $('.drag-target-H').css('left', -svgOffset.left+svgDim/4+'px');
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

function letterClicked(event, letter){
  startX = event.pageX;
  startY = event.pageY; 
  switch (letter){
    case "H":
      dragH = true;
      break;
    case "A":
      dragA = true;
      break;
    case "C":
      dragC = true;
      break;
    case "K":
      dragK = true;
  }
}

function clearDrag(){
  dragH = false;
  dragA = false;
  dragC = false;
  dragK = false;
}

function onDrag(event){
  var currentX = event.pageX;
  var currentY = event.pageY;
  var changeX = startX - currentX;
  var changeY = startY - currentY;
  if (dragH) { 
    var top = parseInt($('.drag-target-H').css('top'));
    $('.drag-target-H').css('top', top-changeY+'px');
    var left = parseInt($('.drag-target-H').css('left'));
    $('.drag-target-H').css('left', left-changeX+'px');
    startX = currentX;
    startY = currentY;
  }
  else if (dragA) {
    var top = parseInt($('.drag-target-A').css('top'));
    $('.drag-target-A').css('top', top-changeY+'px');
    var left = parseInt($('.drag-target-A').css('left'));
    $('.drag-target-A').css('left', left-changeX+'px');
    startX = currentX;
    startY = currentY;
  }
  else if (dragC) {
    var top = parseInt($('.drag-target-C').css('top'));
    $('.drag-target-C').css('top', top-changeY+'px');
    var left = parseInt($('.drag-target-C').css('left'));
    $('.drag-target-C').css('left', left-changeX+'px');
    startX = currentX;
    startY = currentY;
  }
  else if (dragK) {
    var top = parseInt($('.drag-target-K').css('top'));
    $('.drag-target-K').css('top', top-changeY+'px');
    var left = parseInt($('.drag-target-K').css('left'));
    $('.drag-target-K').css('left', left-changeX+'px');
    startX = currentX;
    startY = currentY;
  }
}