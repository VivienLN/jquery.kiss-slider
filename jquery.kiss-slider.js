/*
	JQuery KissSlider plugin
	v1.1
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
			autoscrollDelay: 0,
			noAnim: false,			// Do not animate the slider
			beforeSlide: null,		// callback parameters : oldIndex, newIndex.
			afterSlide: null,		// callback parameters : oldIndex, newIndex.
			init: null,				// calls when the slider is ready
			allowSwipe: true		// @since 1.1 Allow swipe on touch-enabled devices
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
		var _autoscrollInterval;

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
				$(s.paginationBefore + '<button href="#">' + (i+1) + '</button>' + s.paginationAfter).appendTo(s.paginationSelector).data('kissSliderTarget', i);
			}
			$('button', s.paginationSelector).click(paginationClick);
		}
		// autoscroll (pause when mouse over)
		if(s.autoscrollDelay) {
			startAutoScroll(s.autoscrollDelay);
			$container.mouseenter(function(){
				stopAutoScroll();
			});
			$container.mouseleave(function(){
				startAutoScroll(s.autoscrollDelay);
			});
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

		// swipe events
		if(s.allowSwipe) {
			var maxDuration = 1000;
			var minDist = 100; // px
			var maxDeviation = 50; // % of distance in an axe ; max distance in the other axis (ex if horiz swipe, max vertical distance)
			var startX;
			var startY;
			var startTime;
			$slides.each(function(){
				this.addEventListener('touchstart', touchStartEvent, false);
				this.addEventListener('touchend', touchEndEvent);
			});
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

		function startAutoScroll(delay) {
			if(!_autoscrollInterval) {
				_autoscrollInterval = setInterval(function() {
					nextSlide();
				}, delay);
			}
		}

		function stopAutoScroll() {
			clearInterval(_autoscrollInterval);
			_autoscrollInterval = null;
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

		function touchStartEvent(e) {
			console.log('touchstart');
			console.log(e);
			// e.preventDefault();
			// startX = e.pageX ? e.pageX : e.changedTouches[0].pageX;
			// startY = e.pageY ? e.pageY : e.changedTouches[0].pageY;
			startX = e.changedTouches[0].pageX;
			startY = e.changedTouches[0].pageY;
			startTime = new Date().getTime();
		}

		function touchEndEvent(e) {
			console.log('touchend');
			// e.preventDefault();
			var duration = new Date().getTime() - startTime;
			var dir = null;
			if(duration <= maxDuration) {
				// var distX = (e.pageX ? e.pageX : e.changedTouches[0].pageX) - startX;
				// var distY = (e.pageY ? e.pageY : e.changedTouches[0].pageY) - startY;
				var distX = e.changedTouches[0].pageX - startX;
				var distY = e.changedTouches[0].pageY - startY;
				var distXAbs = Math.abs(distX);
				var distYAbs = Math.abs(distY);
				if(distXAbs > minDist && distYAbs <= distXAbs*maxDeviation/100) {
					if(distX < 0) {
						nextSlide();
					} else {
						prevSlide();
					}
				} /*else if(distYAbs > minDist && distXAbs <= distYAbs*maxDeviation/100) {
					dir = distY > 0 ? 'down' : 'up';
				}*/
			}
		}

		// return element for chaining
		return this;
	};
}(jQuery));
