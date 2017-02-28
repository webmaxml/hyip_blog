<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700|Roboto+Slab:400,700" rel="stylesheet">
	<style>
		@font-face {
		    font-family: FontAwesome;
		    src: url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.eot'?>);
		    src: url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.eot?#iefix&v=4.6.3'?>) format("embedded-opentype"),
		    	 url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.woff'?>) format("woff"),
		    	 url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.ttf'?>) format("truetype");
		    font-weight: 400;
		    font-style: normal
		}
		@font-face {
		    font-family: linux-biolinum;
		    src: url(<?php echo get_template_directory_uri() . '/fonts/linux-biolinum.ttf'?>) format("truetype");
		    font-weight: 400;
		    font-style: normal
		}
	</style>
	<?php wp_head(); ?>
</head>
<body>