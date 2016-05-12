# Kiss Slider jQuery Plugin

## Description

Kiss Slider is intended to be a flexible, responsive, yet simple jquery slideshow.

## Demo

[Go and take a look a the demo!](http://vivienleneez.fr/static/jquery.kiss-slider/demo/)

## Quick Start

### HTML
```html
<ul id="kiss-slider">
	<li><img src="img/slide01.jpg" /></li>
	<li><img src="img/slide02.jpg" /></li>
	<li><img src="img/slide03.jpg" /></li>
	<li><img src="img/slide04.jpg" /></li>
	<li><img src="img/slide05.jpg" /></li>
	<li><img src="img/slide06.jpg" /></li>
</ul>
```

### CSS

Just define a width (fixed, fluid, responsive) for the container (here, `#kiss-slider`). The plugin will do the rest.
It is best to set a `overflow:hidden` rule on the container to prevent ["FOUC"](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)

### Javascript

The minimum javascript is as follow:

```js
$(window).load(function() {
	$('#kiss-slider').kissSlider();
});
```
Note: Calling the plugin on `window.load()` allows to properly calculate the slider dimensions, if you do not specify them explicitely.

## Documentation

### Plugin parameters

* `slideSelector (string, default: null)`

	Selector for the slides. If not provided, kissSlider juste selects direct children of the element the plugin is called onto.

* `nextSelector (string, default: null)`

	Selector for the "next" button(s). It is up to you to add it/them to HTML.

* `prevSelector (string, default: null)`

	Selector for the "previous" button(s). It is up to you to add it/them to HTML.

* `paginationSelector (string, default: null)`

	Selector in which append the pagination buttons (`<button>`elements). It is advised to target a `<ul>` element (otherwise you must change the `paginationBefore` and `paginationAfter` parameters).
	It is up to you to add it to HTML.

* `paginationBefore (string, default: '<li>')`

	What to display before each pagination link. Change it especially if `paginationSelector` is not a `<ul>` element.

* `paginationAfter (string, default: '</li>')`

	What to display before each pagination link. Change it especially if `paginationSelector` is not a `<ul>` element.

* `autoscrollDelay (int, default: 0)`

	Delay for automatic scrolling; set to 0 (default)to disable autoscroll.

* `alwaysAutoscroll (boolean, default: false)`

	Never disable autoscroll, even when mouse is over the slideshow

* `startIndex (int, default: 0)`

	0-based index of the slide to display first.

* `startingZ (int, default: 1)`

	z-index for the slides. Usefull if the slider have to display on top of other things

* `slideDuration (int, default: 400)`

	Duration of the sliding animation, in ms.

* `easing (string, default: 'swing')`

	Easing for the sliding animation.

* `noAnim (boolean, default: false)`

	false to not animate the slider.

* `beforeSlide (Function, default: null)`

	Callback. Called each time a sliding animation starts.
	Parameters:
	* `oldIndex`: Index of the slide about to be moved away
	* `newIndex`: Index of the target slide

* `afterSlide (Function, default: null)`

	Callback. Called each time a sliding animation is complete.
	Parameters:
	* `oldIndex`: Index of the slide just moved away
	* `newIndex`: Index of the slide now shown

* `init (Function, default: null)`
	Callback. Called when the slider is initialized and ready.

* `allowSwipe (Boolean, default: true)`
	Add touch events to navigate through slider with touch-enabled devices. Won't work with a mouse.

### Plugin actions

Actions can be called using the same syntax, passing parameters as an object in second argument, for example:
```js
$('#kiss-slider').kissSlider('moveTo', {index:2});
```

	
* `clean`

	Removes all slides from DOM, except for the current one, and internally updates currentIndex.

* `next`

	Go to next slide. No parameter.
	
* `previous`

	Go to previous slide. No parameter.
	
* `moveTo`

	Go to given slide.
	Parameters:
	* `index (int)`: 0-based index of the slide to show
	* `dir (int, default:1)`: `1` to make the slides go right to left, `-1` to go the other way.
	
* `startAutoScroll`

	Start autmatic scrolling of slides.
	Parameters:
	* `delay`: if not specified, the slider will use the `autoscrollDelay` option value
	
* `stopAutoScroll`

	Stop automatic scrolling of slides.
	

