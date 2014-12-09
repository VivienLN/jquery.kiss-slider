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

No need to write specific CSS for this plugin. The minimum css (eg. absolute positioning, overflow, etc.) are handled by the plugin.
You can however define styles in CSS, to not have to wait for everything to be ready before applying styles.
Remember that this is optional.

The minimum CSS is as follow:
```css
#slider .slide { position: absolute; left: 0; top: 0; }
#slider { position: relative; overflow: hidden; }
```
The selector are given as an example.

Note: If you intend to manually define slider dimensions, you must pass them to the plugin call, even if defined in the CSS.

### Javascript

The minimum javascript is as follow:

```js
$(window).load(function() {
	$('#kiss-slider').kissSlider();
});
```
Note: Calling the plugin on window.load() allows to properly calculate the slider dimensions, if you do not specify them explicitely.

## Plugin parameters