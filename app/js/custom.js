$(window).load(function(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

		$('body').addClass('ios');

	} else {

		$('body').addClass('web');
	};
	$('body').removeClass('loaded');
});

/* viewport width */

function viewport(){
	var e = window,
		a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
};

/* viewport width */

$(function(){

	/* placeholder*/

	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){
 			$(this).attr('placeholder', placeholder);
 		});
 	});

	/* placeholder*/

	$('.button-nav').click(function(){
		$(this).toggleClass('active'),
		$('.main-nav-list').slideToggle();
		return false;
	});

	/* components */

$(document).ready(function(){
	$('.slider').slick({
		autoplay: true,
		arrows: true,
		prevArrow: '<i class="fa fa-chevron-left slider__my-arrow-prev" aria-hidden="true"></i>',
		nextArrow: '<i class="fa fa-chevron-right slider__my-arrow-next" aria-hidden="true"></i>',
		dots: true,
		responsive: [{
        breakpoint: 767,
        settings: {
          dots: false
        }
      }]
	});
});

	/* components */

});

var handler = function(){

	var height_footer = $('footer').height();
	var height_header = $('header').height();
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});


	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	if (viewport_wid <= 991) {

	}

}
$(window).bind('load', handler);
$(window).bind('resize', handler);