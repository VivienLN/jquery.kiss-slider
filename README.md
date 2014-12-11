# Kiss Slider jQuery Plugin

## Description

Kiss Slider is intended to be a flexible, responsive, yet simple jquery slideshow.

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

Just define a width (fixed, fluid, responsive) for the container. The plugin will do the rest.

### Javascript

The minimum javascript is as follow:

```js
$(window).load(function() {
	$('#kiss-slider').kissSlider();
});
```
Note: Calling the plugin on `window.load()` allows to properly calculate the slider dimensions, if you do not specify them explicitely.

# Documentation

## Plugin parameters

* `slideSelector (string, default: null)`

	Selector for the slides. If not provided, kissSlider juste selects direct children of the element the plugin is called onto.

* `nextSelector (string, default: null)`

	Selector for the "next" link(s)

* `prevSelector (string, default: null)`

	Selector for the "previous" link(s)

* `paginationSelector (string, default: null)` 	

	Selector in which append the pagination links. It is advised to target a `<ul>` element (otherwise you must change the `paginationBefore` and `paginationAfter` parameters).

* `paginationBefore (string, default: '<li>')`

	What to display before each pagination link. Change it especially if `paginationSelector` is not a `<ul>` element.

* `paginationAfter (string, default: '</li>')`

	What to display before each pagination link. Change it especially if `paginationSelector` is not a `<ul>` element.

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

