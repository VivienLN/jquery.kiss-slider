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
				h2, h3 {margin:2em auto 1em;}
				a {color:#00beed;}
				a:hover {color:#000; text-decoration:none;}
				.container {max-width:900px; width:auto; padding:20px; border:1px solid #ddd; background:#fff; box-shadow:0 0 0.3em #ddd; margin:2em auto;}
					.kiss-slider{}
						.kiss-slider li img{width: 100%;}
					#example2 .kiss-pagination{}
						#example2 .kiss-pagination .current{}
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

			<h2><a href="#example1">Example 1</a></h2>
			<p>This is the basic usage of the plugin.</p>
			<div id="example1">
				<ul class="kiss-slider">
					<li><img src="img/slide01.jpg" /></li>
					<li><img src="img/slide02.jpg" /></li>
					<li><img src="img/slide03.jpg" /></li>
					<li><img src="img/slide04.jpg" /></li>
					<li><img src="img/slide05.jpg" /></li>
					<li><img src="img/slide06.jpg" /></li>
				</ul>
				<ul class="kiss-pagination"></ul>
				<a href="#" class="previous">&larr; previous</a>
				<a href="#" class="next">next &rarr;</a>
				

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

			<h2><a href="#example2">Example 2</a></h2>
			<p>Use of pagination and the startIndex parameters. Note that startIndex is 0-based so <em>startIndex: 3</em> shows the 4th slide.</p>
			<div id="example2">
				<ul class="kiss-slider">
					<li><img src="img/slide01.jpg" /></li>
					<li><img src="img/slide02.jpg" /></li>
					<li><img src="img/slide03.jpg" /></li>
					<li><img src="img/slide04.jpg" /></li>
					<li><img src="img/slide05.jpg" /></li>
					<li><img src="img/slide06.jpg" /></li>
				</ul>
				<ul class="kiss-pagination"></ul>
				<a href="#" class="previous">&larr; previous</a>
				<a href="#" class="next">next &rarr;</a>

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
				// toggles
				$('a[href^="#"]').click(function(){
					$(this.hash).slideToggle();
					return false;
				}).not(':eq(0)').click();
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
				});
			})(jQuery);
		</script>
	</body>
</html>