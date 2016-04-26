/*
	JQuery KissSlider plugin
	v1.4.2
	https://github.com/VivienLN/jquery.kiss-slider
*/
(function ($) {
	var KissSlider = function ($container, options) {
		this.options = {};
		this.$container;
		this.$slides;

		this.currentIndex;
		this.animated = false;
		this.slideWidth;
		this.slideHeight;
		this.autoscrollInterval;

		this.startX;
		this.startY;
		this.startTime;

		return this.init($container, options);
	};
	KissSlider.instances = [];

	KissSlider.prototype.init = function($container, options) {
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
		var that = this;
		var s = this.options = $.extend({}, defaults, options);

		// variables
		that.$container = $container;
		that.$slides = s.slideSelector ? $(s.slideSelector) : $container.children();

		// css
		that.$slides.css({
			position: 'absolute',
			left: 0,
			top: 0,
			zIndex: s.startingZ
		});
		that.$container.css({
			position: 'relative',
			overflow: 'hidden'
		});

		that.resizeSlider();

		that.$slides.css({
			width: '100%'
		});

		// pagination
		if(s.paginationSelector && that.$slides.length > 1) {
			for(var i = 0; i < that.$slides.length; i++) {
				$(s.paginationBefore + '<button>' + (i+1) + '</button>' + s.paginationAfter)
				.appendTo(s.paginationSelector)
				.data('kissSliderTarget', i);
			}
			$('button', s.paginationSelector).click(function(e) {
				that.paginationClick(this);
				e.preventDefault();
			});
			$('button', s.paginationSelector)
			.filter(function(){
				return $(this).data('kissSliderTarget') == s.startIndex;
			})
			.addClass('active');
		}
		// autoscroll (pause when mouse over)
		if(s.autoscrollDelay) {
			that.startAutoScroll(s.autoscrollDelay);
			this.$container.mouseenter(function(){
				that.stopAutoScroll();
			});
			this.$container.mouseleave(function(){
				that.startAutoScroll(s.autoscrollDelay);
			});
		}
		// resize event
		$(window).resize(function() {
			return that.resizeSlider();
		});

		// prev/next events
		if(s.nextSelector) {
			$(s.nextSelector).click(function(e) {
				that.nextSlide();
				e.preventDefault();
			});
		}
		if(s.prevSelector) {
			$(s.prevSelector).click(function(e) {
				that.prevSlide();
				e.preventDefault();
			});
		}

		// swipe events
		if(s.allowSwipe) {
			that.$container[0].addEventListener('touchstart', function(e) {
				that.touchStartEvent(e);
			}, false);
			that.$container[0].addEventListener('touchend', function(e) {
				that.touchEndEvent(e);
			});
		}

		// show first slide
		that.currentIndex = s.startIndex < that.$slides.length ? s.startIndex : 0;
		that.$slides.hide().eq(that.currentIndex).show();

		// callback init
		that.applyCallback(s.init);

		// add instance to list
		KissSlider.instances.push(this);

		// return
		return this.$container;
	};


	KissSlider.prototype.resizeSlider = function() {
		var that = this;
		that.slideWidth = that.$container.innerWidth();
		that.slideHeight = 0;
		that.$slides.each(function() {
			that.slideHeight = Math.max(that.slideHeight, $(this).outerHeight(true));
		});
		that.$container.css('height', that.slideHeight);
	};

	KissSlider.prototype.startAutoScroll = function(delay) {
		var that = this;
		if(!this.autoscrollInterval) {
			this.autoscrollInterval = setInterval(function() {
				that.nextSlide();
			}, delay);
		}
	};

	KissSlider.prototype.stopAutoScroll = function() {
		clearInterval(this.autoscrollInterval);
		this.autoscrollInterval = null;
	};

	// functions
	// @param int index index of the slide to reach
	// @param int dir 1 or -1 (respectively slide to the right and to the left)
	// @param bool noAnim whether or not to skip the animation
	// --------------------------------------
	KissSlider.prototype.moveTo = function(index, dir, noAnim) {
		if(this.animated || index == this.currentIndex) {
			return false;
		}
		this.animated = true;

		index = Math.max(0, Math.min(index, this.$slides.length));
		dir = dir || 1;

		var $target = this.$slides.eq(index);
		var $current = this.$slides.eq(this.currentIndex);
		var that = this;

		this.applyCallback(this.options.beforeSlide, [this.currentIndex, index]);

		$current.css('zIndex', this.options.startingZ + 1);
		$target.css('zIndex', this.options.startingZ + 2).show();
		this.$slides.not($target).not($current).hide();

		if(this.options.paginationSelector) {
			$('button', this.options.paginationSelector)
			.removeClass('active')
			.filter(function(){
				return $(this).data('kissSliderTarget') == index;
			})
			.addClass('active');
		}

		if(noAnim || this.options.noAnim) {
			$target.css('left', 0);
			// applyCallback(this.options.afterSlide, [_currentIndex, index]); // should be called???
			this.currentIndex = index;
			this.animated = false;
		} else {
			var targetLeftFrom = this.slideWidth * dir;
			var distance = -this.slideWidth * dir;
			$target.css('left', targetLeftFrom).add($current).animate({left:'+=' + distance}, this.options.slideDuration, this.options.easing, function() {
				that.finishSlide(index);
			});
		}
		return false;
	};

	KissSlider.prototype.finishSlide = function(newIndex) {
		if(!this.animated) {
			return;
		}
		this.applyCallback(this.options.afterSlide, [this.currentIndex, newIndex]);
		this.currentIndex = newIndex;
		this.animated = false;
	};

	KissSlider.prototype.paginationClick = function(target) {
		var index = $(target).data('kissSliderTarget');
		if(isNaN(index)) {
			return false;
		}
		var dir = index > this.currentIndex ? 1 : -1;
		return this.moveTo(index, dir);
	};

	KissSlider.prototype.nextSlide = function() {
		var target = this.currentIndex + 1 < this.$slides.length ? this.currentIndex + 1 : 0;
		return this.moveTo(target, 1);
	};

	KissSlider.prototype.prevSlide = function() {
		var target = this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : this.$slides.length - 1;
		return this.moveTo(target, -1);
	};

	KissSlider.prototype.applyCallback = function(fn, args) {
		return typeof(fn) === 'function' ? fn.apply(this, args) : null;
	};

	KissSlider.prototype.touchStartEvent = function(e) {
		// e.preventDefault();
		// startX = e.pageX ? e.pageX : e.changedTouches[0].pageX;
		// startY = e.pageY ? e.pageY : e.changedTouches[0].pageY;
		this.startX = e.changedTouches[0].pageX;
		this.startY = e.changedTouches[0].pageY;
		this.startTime = new Date().getTime();
	};

	KissSlider.prototype.touchEndEvent = function(e) {
		// e.preventDefault();
		var maxDuration = 1000;
		var minDist = 100; // px
		var maxDeviation = 50; // % of distance in an axe ; max distance in the other axis (ex if horiz swipe, max vertical distance)
		var duration = new Date().getTime() - this.startTime;
		var dir = null;
		if(duration <= maxDuration) {
			// var distX = (e.pageX ? e.pageX : e.changedTouches[0].pageX) - startX;
			// var distY = (e.pageY ? e.pageY : e.changedTouches[0].pageY) - startY;
			var distX = e.changedTouches[0].pageX - this.startX;
			var distY = e.changedTouches[0].pageY - this.startY;
			var distXAbs = Math.abs(distX);
			var distYAbs = Math.abs(distY);
			if(distXAbs > minDist && distYAbs <= distXAbs*maxDeviation/100) {
				if(distX < 0) {
					this.nextSlide();
				} else {
					this.prevSlide();
				}
			} /*else if(distYAbs > minDist && distXAbs <= distYAbs*maxDeviation/100) {
				dir = distY > 0 ? 'down' : 'up';
			}*/
		}
	};

	KissSlider.callAction = function(target, actionName, actionParams) {
		var instance;
		// find the instance attached to target
		for(var i in KissSlider.instances) {
			if(KissSlider.instances[i].$container[0] === target[0]) {
				instance = KissSlider.instances[i];
				break;
			}
		}
		if(instance) {
			KissSlider.actions[actionName].call(null, instance, actionParams);
		}
	};

	KissSlider.actions = {
		next: function(instance, actionParams) { instance.nextSlide(); },
		previous: function(instance, actionParams) { instance.prevSlide(); },
		moveTo: function(instance, actionParams) { instance.moveTo(actionParams.index, actionParams.dir); }
	};

	// jquery extension (can take options object or action string as parameter)
	$.fn.extend({
		kissSlider: function(optionsOrAction, actionParams) {
			if(typeof(optionsOrAction) === "string" && typeof(KissSlider.actions[optionsOrAction] === "function")) {
				KissSlider.callAction(this, optionsOrAction, actionParams);
				return this;
			}
			// else => init
			this.each(function(){
				new KissSlider($(this), optionsOrAction);
			});
			return this;
		}
	});

}(jQuery));
