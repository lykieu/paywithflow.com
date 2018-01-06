// Avoid `console` errors in browsers that lack a console.

$(window).scroll(function(){
	// Add parallax scrolling to all images in .paralax-image container
	$('.parallax-image').each(function(){
		// only put top value if the window scroll has gone beyond the top of the image
		if ($(this).offset().top < $(window).scrollTop()) {
			// Get ammount of pixels the image is above the top of the window
			var difference = $(window).scrollTop() - $(this).offset().top;
			// Top value of image is set to half the amount scrolled
			// (this gives the illusion of the image scrolling slower than the rest of the page)
			var half = (difference / 2) + 'px';

			$(this).find('img').css('top', half);
		} else {
			// if image is below the top of the window set top to 0
			$(this).find('img').css('top', '0');
		}
	});
});

$(function () {
    $('#mainmenu a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
// Place any jQuery/helper plugins in here.