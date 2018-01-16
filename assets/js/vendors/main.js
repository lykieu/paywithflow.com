window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-111501789-1');

$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    items: 1,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true
  });
});

// Web Complete Loaded
$(window).on('load', function(e) {
  setTimeout(function(){
    $(".pre-loader").fadeOut(200);
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      disable: 'phone'
    });
  }, 200);
})

if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
  skrollr.init({
    smoothScrolling: true,
    smoothScrollingDuration: 500
  });
}

particlesJS.load('particles-js', 'assets/particles.json');

$(window).scroll(function(){
  var wScroll = $(this).scrollTop()
  var hWindow = $(window).height()

  // Back to top show
  if (wScroll > $(window).height()) {
    $(".back-to-top").fadeIn();
  }
  else {
    $(".back-to-top").fadeOut();
  }

  // Paralax Background
  if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
    $('.introduction').css({'background-position': 'center '+ (-wScroll /3) + 'px'})

    if (wScroll > $('.sending-money').offset().top - hWindow) {
      var wSendingMoneyScroll = wScroll - $('.sending-money').offset().top + hWindow;
      $('.sending-money').css({'background-position': 'center '+ (-wSendingMoneyScroll /3 + hWindow/3) + 'px'})
    }
  }
})

$(window).resize(function() {
  if ($(window).width() <= 767) {
    $('.introduction').css({'background-position': 'center 0'})
    $('.sending-money').css({'background-position': 'center 0'})
  }
})

// Expand menu
var isTopBarExpand = false
$('.top-bar .expand-button').click(function() {
  if (!isTopBarExpand) {
    isTopBarExpand = true;
    $('#top-bar').addClass('is-expand');
  }
  else {
    isTopBarExpand = false;
    $('#top-bar').removeClass('is-expand');
  }
})
$('#top-bar').blur(function(){
  $('#top-bar').removeClass('is-expand');
  isTopBarExpand = false
})


// Back to Top
$(".back-to-top").click(function () {
   $("html, body").animate({scrollTop: 0}, 1100);
});


function register($form) {
  $.ajax({
    type: "GET",
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    error: function (err) {
      console.log('error')
    },
    success: function (data) {
      if (data.result != "success") {
        var errorMessage = data.msg
        if (errorMessage === "0 - Please enter a value") {
          errorMessage = "Please enter your email address."
        }
        $("#subscribe-result").html("<p class='info-message'>" + errorMessage + "</p>");
      } else {
         $("#subscribe-result").html("<p class='info-message'>Thank you for your subscription!</p>");
      }
      $("#subscribe-result").show();
      setTimeout(function() {  $("#subscribe-result").hide(); }, 10000);
    }
  });
}

$(document).on('submit', '#mc-embedded-subscribe-form', function (event) {
  try {
    var $form = jQuery(this);
    event.preventDefault();
    register($form);
  } catch (error) { console.log(error); }
});
