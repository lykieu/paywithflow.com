'use strict'

// Google ReCapcha
var isVerifyCapcha = false
const verifyCallback = function(response) {
  isVerifyCapcha = true
};
var onloadCallback = function() {
  grecaptcha.render('google-recapcha', {
    'sitekey' : '6LdaFTMUAAAAAEvy3R4BPRmYojuebdlzckwlKSla',
    'callback' : verifyCallback
  });
};

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

$(window).scroll(function(){
  var wScroll = $(this).scrollTop()
  var hWindow = $(window).height()

  // Paralax Background
  if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
    $('.head-background').css({'background-position': 'center '+ (-wScroll /3) + 'px'})
  }
})

$('#contact-form').submit(function(event) {
  event.preventDefault();
  event.stopPropagation();
  const name = $('#name').val()
  const email = $('#email').val()
  const subject = $('#subject').val()
  const content = $('#content').val()
  const notification = $('.contact-notification')
  const submitButton = $('#contact-form-button')

  const isEmpty = validator.isEmpty
  const isMobilePhone = validator.isMobilePhone
  const isEmail = validator.isEmail

  if (
    !isEmpty(name) &&
    !isEmpty(email) &&
    !isEmpty(subject) &&
    !isEmpty(content) &&
    isEmail(email) &&
    isVerifyCapcha
  ) {
    const formdata = { name, email, subject, content }
    submitButton.text('Sending...')

    $.ajax({
      type: "POST",
      url: "https://app.paywithflow.com/paywithflow-website/contact",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(formdata),
      success: function() {
        $( '#contact-form' ).each(function(){
          this.reset()
        })
        grecaptcha.reset()
        isVerifyCapcha = false
        submitButton.text('Send')
        notification.text('Your message has been sent!')
        setTimeout(function(){
          notification.text('')
        }, 4000);
      },
      error: function(error) {
        submitButton.text('Send')
        notification.text(error)
        setTimeout(function(){
          notification.text('')
        }, 4000);
      },
    })
  }
  else {
    notification.text('Please enter fields and correct format')
    setTimeout(function(){
      notification.text('')
    }, 4000);
  }
});

//
//
// function renderMap() {
//   var mapProp = {
//     center:new google.maps.LatLng(16.458753, 107.591764),
//     zoom: 15,
//     styles: [
//       {
//           "featureType": "water",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#e9e9e9"
//               },
//               {
//                   "lightness": 17
//               }
//           ]
//       },
//       {
//           "featureType": "landscape",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#f5f5f5"
//               },
//               {
//                   "lightness": 20
//               }
//           ]
//       },
//       {
//           "featureType": "road.highway",
//           "elementType": "geometry.fill",
//           "stylers": [
//               {
//                   "color": "#ffffff"
//               },
//               {
//                   "lightness": 17
//               }
//           ]
//       },
//       {
//           "featureType": "road.highway",
//           "elementType": "geometry.stroke",
//           "stylers": [
//               {
//                   "color": "#ffffff"
//               },
//               {
//                   "lightness": 29
//               },
//               {
//                   "weight": 0.2
//               }
//           ]
//       },
//       {
//           "featureType": "road.arterial",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#ffffff"
//               },
//               {
//                   "lightness": 18
//               }
//           ]
//       },
//       {
//           "featureType": "road.local",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#ffffff"
//               },
//               {
//                   "lightness": 16
//               }
//           ]
//       },
//       {
//           "featureType": "poi",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#f5f5f5"
//               },
//               {
//                   "lightness": 21
//               }
//           ]
//       },
//       {
//           "featureType": "poi.park",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#dedede"
//               },
//               {
//                   "lightness": 21
//               }
//           ]
//       },
//       {
//           "elementType": "labels.text.stroke",
//           "stylers": [
//               {
//                   "visibility": "on"
//               },
//               {
//                   "color": "#ffffff"
//               },
//               {
//                   "lightness": 16
//               }
//           ]
//       },
//       {
//           "elementType": "labels.text.fill",
//           "stylers": [
//               {
//                   "saturation": 36
//               },
//               {
//                   "color": "#333333"
//               },
//               {
//                   "lightness": 40
//               }
//           ]
//       },
//       {
//           "elementType": "labels.icon",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "transit",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#f2f2f2"
//               },
//               {
//                   "lightness": 19
//               }
//           ]
//       },
//       {
//           "featureType": "administrative",
//           "elementType": "geometry.fill",
//           "stylers": [
//               {
//                   "color": "#fefefe"
//               },
//               {
//                   "lightness": 20
//               }
//           ]
//       },
//       {
//           "featureType": "administrative",
//           "elementType": "geometry.stroke",
//           "stylers": [
//               {
//                   "color": "#fefefe"
//               },
//               {
//                   "lightness": 17
//               },
//               {
//                   "weight": 1.2
//               }
//           ]
//       }
//     ]
//   };
//   var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
// }
