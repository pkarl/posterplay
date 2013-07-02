$(document).ready(function() {

	// available posters
	var extras = [];

	$('.extra').each(function() {
		extras.push($(this).data('url'));
	});

	$('#posterwall').packery({
	  itemSelector: '.poster-mod',
	  gutter: 0
	});

	$('.poster-mod').on('mouseenter', function() {

		var $poster = $(this).find('.poster');
		var $postermod = $(this);

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

		$postermod.find('.front, .back').css({
			'position': 'absolute'
		});

		$postermod.find('.front').transition({
			perspective: '1000px',
			rotateY: '180deg'
		}, 1000, function() {
			$(this).remove();
		});

		$postermod.find('.back').show().transition({
			perspective: '1000px',
			rotateY: '0deg'
		}, 1000, function() {
			$(this).removeClass('back').addClass('front').css('position', 'block');
		});

	});

});
