$(document).ready(function() {

	// available posters
	var extras = [];

	// grab our starter set of non-shown posters
	$('.extra').each(function() {
		extras.push($(this).data('url'));
	});

	// here's packery doing not-much for me.
	$('#posterwall').packery({
		itemSelector: '.poster-mod',
		gutter: 0
	});

	setInterval(flipRandomPoster, 200);

	function flipRandomPoster() {
		flipPoster(getRandomPosterMod());
	}

	function getRandomPosterMod() {
		return $('.poster-mod')[ Math.floor(Math.random() * $('.poster-mod').length)-1 + 0 ];
	}

	function flipPoster(target) {

		// get handles
		var $postermod = $(target);
		var $poster = $postermod.find('.poster');
		
		// // grab a spare image from the pile
		var newURL = extras.pop();
		extras.unshift($poster.data('url'));

		// // generate an img tag
		var $img = $('<div/>')
				.addClass('poster back')
				.data('url', newURL)
				.css({
					'background-image': 'url(' + newURL + ')',
				})
				.appendTo( $postermod );

		// position these absolutely (shouldn't I just do this in CSS?)
		$postermod.find('.front, .back').css({
			'position': 'absolute'
		});

		// transition the front...
		$postermod.find('.front').transition({
			perspective: '1000px',
			rotateY: '180deg'
		}, 1000, function() {
			$(this).remove();
		});

		// ...and immediately also transition the back
		$postermod.find('.back').show().transition({
			perspective: '1000px',
			rotateY: '0deg'
		}, 1000, function() {
			$(this).removeClass('back').addClass('front').css('position', 'block');
		});
	}
});
