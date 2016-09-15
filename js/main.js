var breakWidth = 767;
var dragH = false;
var dragA = false;
var dragC = false;
var dragK = false;
var firstClick = false;
var complete = false;
var COMPLETION_LENIENCY = 5;
var startX;
var startY;

$(document).ready(function() {

  var today = new Date();
  if (today.getDate() == 1 && today.getMonth() == 3) {
    $('body').addClass('foolsday');
  }

  $('#main').transition('fade in', 1500);

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
    var is_valid_email = function(email){ return (/^.+@.+\..+$/).test(email); };
    // ^^ Yes, this is easy to break. If you're reading this you're probably smart enough to find a way around it
    // but there are a thousand other ways to do malicious things so its not worth our time to stop you :)
    var emailTag = $('#reg-now-form-email');
    var email = emailTag.val();
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
  });

  //code for hack
  var resizeTimeout;
  var resizeNavbarTimeout;
  var resizeLettersTimeout;

  $(window).on('resize', function() {
    clearTimeout(resizeTimeout);
    clearTimeout(resizeNavbarTimeout);
    clearTimeout(resizeLettersTimeout);
    resizeTimeout = setTimeout(hideAnswers(), 200);
    resizeNavbarTimeout = setTimeout(recalculateNavbarPosition(), 250);
    resizeLettersTimeout = setTimeout(resizeLetters(), 200);
  });

  $('.splash-img').attr('draggable', 'false');
    window.onload = function(){
      resizeLetters();
    };
  });

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

  function checkAndMoveNavbarPosition() {
    recalculateNavbarPosition();
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

    if (event.preventDefault) {
	    event.preventDefault();
    }

    if (!firstClick) {
      $('.drag-target-H').css('visibility', 'visible');
      $('.drag-target-A').css('visibility', 'visible');
      $('.drag-target-C').css('visibility', 'visible');
      $('.drag-target-K').css('visibility', 'visible');
    }
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

  function onDrag(event){
    if(!complete) {
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
  }

  function clearDrag(){
    dragH = false;
    dragA = false;
    dragC = false;
    dragK = false;
    var hComplete = false;
    var aComplete = false;
    var cComplete = false;
    var kComplete = false;

    hTopOffset = $('.drag-target-H').offset().top-$('.splash-title.H').offset().top;
    hLeftOffset = $('.drag-target-H').offset().left-$('.splash-title.H').offset().left;
    var COMPLETE_OFFSET = [.8, .8];
    if (Math.abs(hTopOffset-COMPLETE_OFFSET[0])<COMPLETION_LENIENCY && Math.abs(hLeftOffset-COMPLETE_OFFSET[1])<COMPLETION_LENIENCY) {
      hComplete = true;
    }

    aTopOffset = $('.drag-target-A').offset().top-$('.splash-title.A').offset().top;
    aLeftOffset = $('.drag-target-A').offset().left-$('.splash-title.A').offset().left;
    if (Math.abs(aTopOffset-COMPLETE_OFFSET[0])<COMPLETION_LENIENCY && Math.abs(aLeftOffset-COMPLETE_OFFSET[1])<COMPLETION_LENIENCY) {
      aComplete = true;
    }
    cTopOffset = $('.drag-target-C').offset().top-$('.splash-title.C').offset().top;
    cLeftOffset = $('.drag-target-C').offset().left-$('.splash-title.C').offset().left;
    if (Math.abs(cTopOffset-COMPLETE_OFFSET[0])<COMPLETION_LENIENCY && Math.abs(cLeftOffset-COMPLETE_OFFSET[1])<COMPLETION_LENIENCY) {
      cComplete = true;
    }
    kTopOffset = $('.drag-target-K').offset().top-$('.splash-title.K').offset().top;
    kLeftOffset = $('.drag-target-K').offset().left-$('.splash-title.K').offset().left;
    if (Math.abs(kTopOffset-COMPLETE_OFFSET[0])<COMPLETION_LENIENCY && Math.abs(kLeftOffset-COMPLETE_OFFSET[1])<COMPLETION_LENIENCY) {
      kComplete = true;
    }
    if(hComplete && aComplete && cComplete && kComplete) {
      complete = true;
      deleteLetters();
    }
  }

  function resizeLetters() {
    if (!complete) {
      var svgDim = parseInt($('.splash-img').css('height'));
      var svgPosition = $('.splash-img').position();
      $('.drag-target-H').css('top', svgPosition.top +.9*svgDim/4+'px');
      $('.drag-target-H').css('left', svgPosition.left+svgDim/4+'px');
      $('.drag-target-A').css('top', svgPosition.top +svgDim/4+'px');
      $('.drag-target-A').css('left', svgPosition.left+2.5*svgDim/4+'px');
      $('.drag-target-C').css('top', svgPosition.top +2.5*svgDim/4+'px');
      $('.drag-target-C').css('left', svgPosition.left+svgDim/4+'px');
      $('.drag-target-K').css('top', svgPosition.top +2.5*svgDim/4+'px');
      $('.drag-target-K').css('left', svgPosition.left+2.5*svgDim/4+'px');
    } else {
       var hOffset = $('.splash-title.H').offset();
       var aOffset = $('.splash-title.A').offset();
       var cOffset = $('.splash-title.C').offset();
       var kOffset = $('.splash-title.K').offset();
       $('.drag-target-H').offset({top: hOffset.top, left: hOffset.left});  
       $('.drag-target-A').offset({top: aOffset.top, left: aOffset.left});  
       $('.drag-target-C').offset({top: cOffset.top, left: cOffset.left});  
       $('.drag-target-K').offset({top: kOffset.top, left: kOffset.left});  
    }
  }

  function deleteLetters() {
    var hOffset = $('.splash-title.H').offset();
    $('.drag-target-H').offset({top: hOffset.top, left: hOffset.left});  
    $('.drag-target-H').addClass('animated infinite flash');
    var aOffset = $('.splash-title.A').offset();
    $('.drag-target-A').offset({top: aOffset.top, left: aOffset.left});  
    $('.drag-target-A').addClass('animated infinite shake');
    $('.drag-target-C').addClass('animated infinite bounce');
    var cOffset = $('.splash-title.C').offset();
    $('.drag-target-C').offset({top: cOffset.top, left: cOffset.left});  
    $('.splash-title.C').text('X');
    $('.splash-title.C').addClass('animated fadeIn');
    var kOffset = $('.splash-title.K').offset();
    $('.drag-target-K').offset({top: kOffset.top, left: kOffset.left});    
    $('.drag-target-K').addClass('animated infinite flipInY');
    $('.splash-title.end').text('CD');
    $('.splash-title.end').addClass('animated fadeIn');
    $('.large.subtitle').css('font-family', 'xkcd');
    $('.large.subtitle').text('.com');
    $('.large.subtitle').addClass('animated fadeIn');
  }

  function createGhostImage(text) {
    var newImage = $('<div> </div>');
    newImage.text(text);
    $('.body').append(newImage);
    newImage.css('z-index', -1);
    return newImage.get(0);
  }
