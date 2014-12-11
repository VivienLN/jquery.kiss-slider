/*
	JQuery KissSlider plugin
	v1.0
	https://github.com/VivienLN/jquery.kiss-slider
*/
(function ($) {
	$.fn.kissSlider = function(options) {
		// settings
		var defaults = {
			slideSelector: null,	// if null, get the direct children
			nextSelector: null,
			prevSelector: null,
			paginationSelector: null, 	// container where pagination liks are generated
			paginationBefore: '',		// '<li>'
			paginationAfter: '',		// '</li>'
			paginationCurrentClass: 'current', //
			startIndex: 0,
			startingZ: 1,			// z-index for the slides. Usefull if the slider have to display on top of other things
			slideDuration: 400,
			easing: 'swing',
			noAnim: false,			// Do not animate the slider
			beforeSlide: null,		// callback parameters : oldIndex, newIndex.
			afterSlide: null,		// callback parameters : oldIndex, newIndex.
			init: null,				// calls when the slider is ready
		};
		var s = $.extend({}, defaults, options);

		// jquery collections
		var $container = this;
		var $slides = s.slideSelector ? $(s.slideSelector) : $container.children();

		// intern variables
		var _currentIndex;
		var _animated = false;
		var _slideWidth;
		var _slideHeight;

		$slides.css({
			position: 'absolute',
			left: 0,
			top: 0,
			zIndex: s.startingZ
		});
		$container.css({
			position: 'relative',
			overflow: 'hidden'
		});

		resizeSlider();

		$slides.css({
			width: '100%'
		});

		// pagination
		if(s.paginationSelector) {
			for(var i = 0; i < $slides.length; i++) {
				$(s.paginationBefore + '<a href="#">' + (i+1) + '</a>' + s.paginationAfter).appendTo(s.paginationSelector).data('kissSliderTarget', i);
			}
			$('a', s.paginationSelector).click(paginationClick);
		}
		// resize event
		$(window).resize(resizeSlider);
		// prev/next events
		if(s.nextSelector) {
			$(s.nextSelector).click(nextSlide);
		}
		if(s.prevSelector) {
			$(s.prevSelector).click(prevSlide);
		}

		// show first slide
		_currentIndex = s.startIndex < $slides.length ? s.startIndex : 0;
		$slides.hide().eq(_currentIndex).show();

		// callback init
		applyCallback(s.init);

		function resizeSlider() {
			_slideWidth = $container.innerWidth();
			_slideHeight = 0;
			$slides.each(function() {
				_slideHeight = Math.max(_slideHeight, $(this).outerHeight(true));
			});
			$container.css('height', _slideHeight);
		}

		// functions
		// @param int index index of the slide to reach
		// @param int dir 1 or -1 (respectively slide to the right and to the left)
		// @param bool noAnim whether or not to skip the animation
		// --------------------------------------
		function moveTo(index, dir, noAnim) {
			if(_animated || index == _currentIndex) {
				return false;
			}
			_animated = true;

			index = Math.max(0, Math.min(index, $slides.length));
			dir = dir || 1;


			var $target = $slides.eq(index);
			var $current = $slides.eq(_currentIndex);

			applyCallback(s.beforeSlide, [_currentIndex, index]);

			$current.css('zIndex', s.startingZ + 1);
			$target.css('zIndex', s.startingZ + 2).show();
			$slides.not($target).not($current).hide();
			if(noAnim || s.noAnim) {
				$target.css('left', 0);
				// applyCallback(s.afterSlide, [_currentIndex, index]); // should be called???
				_currentIndex = index;
				_animated = false;
			} else {
				var targetLeftFrom = _slideWidth * dir;
				var distance = -_slideWidth * dir;
				$target.css('left', targetLeftFrom).add($current).animate({left:'+=' + distance}, s.slideDuration, s.easing, function() {
					finishSlide(index);
				});
			}
			return false;
		}

		function finishSlide(newIndex) {
			if(!_animated) {
				return;
			}
			applyCallback(s.afterSlide, [_currentIndex, newIndex]);
			_currentIndex = newIndex;
			_animated = false;
		}

		function paginationClick() {
			var index = $(this).data('kissSliderTarget');
			if(isNaN(index)) {
				return false;
			}
			var dir = index > _currentIndex ? 1 : -1;
			return moveTo(index, dir);
		}

		function nextSlide() {
			var target = _currentIndex + 1 < $slides.length ? _currentIndex + 1 : 0;
			return moveTo(target, 1);
		}

		function prevSlide() {
			var target = _currentIndex - 1 >= 0 ? _currentIndex - 1 : $slides.length - 1;
			return moveTo(target, -1);
		}

		function applyCallback(fn, args) {
			return typeof(fn) === 'function' ? fn.apply(this, args) : null;
		}

		// return element for chaining
		return this;
	};
}(jQuery));