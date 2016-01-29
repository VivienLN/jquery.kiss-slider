<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Jquery Kiss Slider Demo</title>
		<meta charset='utf-8'>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Content-Language" content="en">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="../jquery.kiss-slider.min.js"></script>
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/default.min.css">
		<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
		<style type="text/css">
			*{padding:0;margin:0;}
			ul {list-style-type:none;}
			body{background:#eee; font-family:sans-serif; color:#222;}
				pre, code {border-radius:4px; margin:1em auto;}
				h1 {margin-bottom:1em;}
				h2 {margin:2em auto 1em; padding-bottom:.5em; border-bottom:1px solid #ddd;}
				h3 {margin:2em auto 1em; color:#444;}
				button {color:#000; padding:16px 40px; border-radius:4px; border:1px solid #ccc; background:none; cursor:pointer; font-size:16px; margin:8px; border-bottom-width:2px;}
					button:hover {color:#308bbb;border-color:#308bbb;}
					.kiss-pagination button {padding:10px;}
				.container {max-width:900px; width:auto; padding:20px; border:1px solid #ddd; background:#fff; box-shadow:0 0 0.3em #ddd; margin:2em auto;}
					.kiss-slider{margin:20px auto;}
						.kiss-slider li img{width: 100%;}
					#example2 .kiss-pagination{}
						#example2 .kiss-pagination .current{}
				.text-center {text-align: center;}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>jquery.kiss-slider</h1>
			<p>
				<a href="https://github.com/VivienLN/jquery.kiss-slider">https://github.com/VivienLN/jquery.kiss-slider</a><br/>
				<br/>
				Some usage examples.<br/>
				Resize your browser: these slideshows are responsive.<br/>
			</p>

			<div id="example1">
				<h2>Example 1</h2>
				<p>This is the basic usage of the plugin.</p>
				<ul class="kiss-slider">
					<li><img src="img/slide01.jpg" /></li>
					<li><img src="img/slide02.jpg" /></li>
					<li><img src="img/slide03.jpg" /></li>
					<li><img src="img/slide04.jpg" /></li>
					<li><img src="img/slide05.jpg" /></li>
					<li><img src="img/slide06.jpg" /></li>
				</ul>
				<ul class="kiss-pagination text-center"></ul>
				<p class="text-center">
					<button type="button" class="previous">&larr; previous</button>
					<button type="button" class="next">next &rarr;</button>
				</p>

				<h3>HTML: </h3>
				<pre><code class="html">
<?php echo htmlentities('
<ul id="kiss-slider">
	<li><img src="img/slide01.jpg" /></li>
	<li><img src="img/slide02.jpg" /></li>
	<li><img src="img/slide03.jpg" /></li>
	<li><img src="img/slide04.jpg" /></li>
	<li><img src="img/slide05.jpg" /></li>
	<li><img src="img/slide06.jpg" /></li>
</ul>
<a href="#" class="previous">&larr; previous</a>
<a href="#" class="next">next &rarr;</a>
'); ?>
				</code></pre>

				<h3>JS: </h3>
				<pre><code class="js">
(function($) {
	$(window).load(function() {
		$('#example1 .kiss-slider').kissSlider({
			prevSelector: '#example1 .previous',
			nextSelector: '#example1 .next',
		});
	});
})(jQuery);
				</code></pre>

			</div>

			<div id="example2">
				<h2>Example 2</h2>
				<p>Use of pagination and the startIndex parameters. Note that startIndex is 0-based so <em>startIndex: 3</em> shows the 4th slide.</p>
				<ul class="kiss-slider">
					<li><img src="img/slide01.jpg" /></li>
					<li><img src="img/slide02.jpg" /></li>
					<li><img src="img/slide03.jpg" /></li>
					<li><img src="img/slide04.jpg" /></li>
					<li><img src="img/slide05.jpg" /></li>
					<li><img src="img/slide06.jpg" /></li>
				</ul>
				<ul class="kiss-pagination text-center"></ul>
				<p class="text-center">
					<button type="button" class="previous">&larr; previous</button>
					<button type="button" class="next">next &rarr;</button>
				</p>
				<h3>HTML: </h3>
				<pre><code class="html">
<?php echo htmlentities('
<ul id="kiss-slider">
	<li><img src="img/slide01.jpg" /></li>
	<li><img src="img/slide02.jpg" /></li>
	<li><img src="img/slide03.jpg" /></li>
	<li><img src="img/slide04.jpg" /></li>
	<li><img src="img/slide05.jpg" /></li>
	<li><img src="img/slide06.jpg" /></li>
</ul>
<ul id="kiss-pagination"></ul>
<a href="#" class="previous">&larr; previous</a>
<a href="#" class="next">next &rarr;</a>
'); ?>
				</code></pre>

				<h3>JS: </h3>
				<pre><code class="js">
(function($) {
	$(window).load(function() {
		$('#example2 .kiss-slider').kissSlider({
			prevSelector: '#example2 .previous',
			nextSelector: '#example2 .next',
			paginationSelector: '#example2 .kiss-pagination',
			startIndex:3,
		});
	});
})(jQuery);
				</code></pre>

			</div>

			<div id="example3">
				<h2>Example 3</h2>
				<p>Plugin actions.</p>
				<ul class="kiss-slider">
					<li><img src="img/slide01.jpg" /></li>
					<li><img src="img/slide02.jpg" /></li>
					<li><img src="img/slide03.jpg" /></li>
					<li><img src="img/slide04.jpg" /></li>
					<li><img src="img/slide05.jpg" /></li>
					<li><img src="img/slide06.jpg" /></li>
				</ul>
				<ul class="kiss-pagination text-center"></ul>
				<p class="text-center btn-actions">
					<button type="button" data-target="0">To slide 0!</button>
					<button type="button" data-target="3">To slide 3!</button>
					<button type="button" data-target="4">To slide 4!</button>
				</p>

				<h3>HTML: </h3>
				<pre><code class="html">
<?php echo htmlentities('
<ul id="kiss-slider">
	<li><img src="img/slide01.jpg" /></li>
	<li><img src="img/slide02.jpg" /></li>
	<li><img src="img/slide03.jpg" /></li>
	<li><img src="img/slide04.jpg" /></li>
	<li><img src="img/slide05.jpg" /></li>
	<li><img src="img/slide06.jpg" /></li>
<ul class="kiss-pagination text-center"></ul>
<p class="text-center btn-actions">
	<button type="button" data-target="0">To slide 0!</button>
	<button type="button" data-target="3">To slide 3!</button>
	<button type="button" data-target="4">To slide 4!</button>
</p>
'); ?>
				</code></pre>

				<h3>JS: </h3>
				<pre><code class="js">
(function($) {
	$(window).load(function() {
		$('#example3 .kiss-slider').kissSlider({
			prevSelector: '#example3 .previous',
			nextSelector: '#example3 .next'
		});
		$('#example3 .btn-actions button').click(function() {
			$('#example3 .kiss-slider').kissSlider('moveTo', {index:$(this).data('target')});
		})
	});
})(jQuery);
				</code></pre>

			</div>


			<h2>Notes</h2>
			<p>images used:</p>
			<ul>
				<li><a href="http://j3concepts.deviantart.com/art/Time-Travel-in-a-Time-of-Regret-319922355">http://j3concepts.deviantart.com/art/Time-Travel-in-a-Time-of-Regret-319922355</a></li>
				<li><a href="http://88grzes.deviantart.com/art/Swamp-Ambush-2-453265331">http://88grzes.deviantart.com/art/Swamp-Ambush-2-453265331</a></li>
			</ul>
		</div>

		<script type="text/Javascript">
			hljs.initHighlightingOnLoad();
			(function($) {
				// sliders
				$(window).load(function() {
					// example 1
					$('#example1 .kiss-slider').kissSlider({
						prevSelector: '#example1 .previous',
						nextSelector: '#example1 .next',
					});
					// example 2
					$('#example2 .kiss-slider').kissSlider({
						prevSelector: '#example2 .previous',
						nextSelector: '#example2 .next',
						paginationSelector: '#example2 .kiss-pagination',
						startIndex:3,
					});
					// example 3
					$('#example3 .kiss-slider').kissSlider({
						prevSelector: '#example3 .previous',
						nextSelector: '#example3 .next'
					});
					$('#example3 .btn-actions button').click(function() {
						$('#example3 .kiss-slider').kissSlider('moveTo', {index:$(this).data('target')});
					})
				});
			})(jQuery);
		</script>
	</body>
</html>
