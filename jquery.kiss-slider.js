(function ($) {
	$.fn.kissSlider = function(options) {
		// settings
		var defaults = {
			slideSelector: null,	// if null, get the direct children
			nextSelector: null,
			prevSelector: null,
			slideWidth: 0,			// 0 to automatically calculate it
			slideHeight: 0,			// 0 to automatically calculate it
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
		var _currentIndex = s.startIndex < $slides.length ? s.startIndex : 0 ;
		var _animated = false;

		// slides css (needed to get the slider size)
		$slides.css({
			position: 'absolute',
			left: 0,
			top: 0,
			zIndex: s.startingZ
		});

		// slides size (the biggest one, although it is preferred that they all have the same dimensions)
		if(!s.slideWidth) {
			$slides.each(function() {
				s.slideWidth = $(this).outerWidth(true);
			});		
		}
		if(!s.slideHeight) {
			$slides.each(function() {
				s.slideHeight = $(this).outerHeight(true);
			});		
		}

		// container css (now that we know the wanted size)
		$container.css({
			position: 'relative',
			overflow: 'hidden',
			width: s.slideWidth + 'px',
			height: s.slideHeight + 'px'
		});

		// events
		if(s.nextSelector) {
			$(s.nextSelector).click(nextSlide);
		}
		if(s.prevSelector) {
			$(s.prevSelector).click(prevSlide);
		}

		// show first slide
		moveTo(_currentIndex, true);

		// callback init
		applyCallback(s.init)

		// functions
		// @param int index index of the slide to reach
		// @param bool noAnim whether or not to skip the animation
		// @param int dir 1 or -1 (respectively slide to the right and to the left)
		// --------------------------------------
		function moveTo(index, noAnim, dir) {
			if(_animated) {
				return false;
			}
			_animated = true;

			index = Math.max(0, Math.min(index, $slides.length));
			dir = dir || 1;

			var $target = $slides.eq(index);
			var $current = $slides.eq(_currentIndex);

			applyCallback(s.beforeSlide, [_currentIndex, index]);

			$current.css('zIndex', s.startingZ + 1);
			$target.css('zIndex', s.startingZ + 2);
			if(noAnim || s.noAnim) {
				$target.css('left', 0);
				// applyCallback(s.afterSlide, [_currentIndex, index]); // should be called???
				_currentIndex = index;
				_animated = false;
			} else {
				var targetLeftFrom = s.slideWidth * dir;
				var distance = -s.slideWidth * dir;
				$target.css('left', targetLeftFrom).add($current).animate({left:'+=' + distance}, s.slideDuration, s.easing, function() {
					if(!_animated) {
						return;
					}
					applyCallback(s.afterSlide, [_currentIndex, index]);
					_currentIndex = index;
					_animated = false;
				});
			}
			return false;
		}

		function nextSlide() {
			var target = _currentIndex + 1 < $slides.length ? _currentIndex + 1 : 0;
			return moveTo(target, false, 1);
		}

		function prevSlide() {
			var target = _currentIndex - 1 >= 0 ? _currentIndex - 1 : $slides.length - 1;
			return moveTo(target, false, -1);
		}

		function applyCallback(fn, args) {
			return typeof(fn) === 'function' ? fn.apply(this, args) : null;
		}

		// return element for chaining
		return this;
	};
}(jQuery));