<h1>$POST</h1>
<pre><?php print_r( $post ); ?></pre>
<h1>$PAGE</h1>
<pre><?php print_r( $page ); ?></pre>
<h1>$PAGES</h1>
<pre><?php print_r( $pages ); ?></pre>
<h1>$NUMPAGES</h1>
<pre><?php print_r( $numpages ); ?></pre>

<h1>query_vars</h1>
<pre><?php print_r( 'page - ' . get_query_var( 'page' ) ); ?></pre>
<pre><?php print_r( 'paged - ' . get_query_var( 'paged' ) ); ?></pre>


<h1>CONDITIONALS</h1>

<?php if ( is_main_query() )  { ?>
	<strong>is_main_query</strong><br>
<?php } ?>

<?php if ( in_the_loop() )  { ?>
	<strong>in_the_loop</strong><br>
<?php } ?>

<?php if ( is_front_page() )  { ?>
	<strong>is_front_page</strong><br>
<?php } ?>

<?php if ( is_home() )  { ?>
	<strong>is_home</strong><br>
<?php } ?>

<?php if ( is_page() )  { ?>
	<strong>is_page</strong><br>
<?php } ?>

<?php if ( is_paged() )  { ?>
	<strong>is_paged</strong><br>
<?php } ?>

<?php if ( is_single() )  { ?>
	<strong>is_single</strong><br>
<?php } ?>

<?php if ( is_singular() )  { ?>
	<strong>is_singular</strong><br>
<?php } ?>

<?php if ( is_attachment() )  { ?>
	<strong>is_attachment</strong><br>
<?php } ?>

<?php if ( is_archive() )  { ?>
	<strong>is_archive</strong><br>
<?php } ?>

<?php if ( is_category() )  { ?>
	<strong>is_category</strong><br>
<?php } ?>

<?php if ( is_author() )  { ?>
	<strong>is_author</strong><br>
<?php } ?>

<?php if ( is_date() )  { ?>
	<strong>is_date</strong><br>
<?php } ?>

<?php if ( is_search() )  { ?>
	<strong>is_search</strong><br>
<?php } ?>

<?php if ( is_404() )  { ?>
	<strong>is_404</strong><br>
<?php } ?>

<h1>WP_QUERY</h1>
<pre><?php print_r( $wp_the_query ); ?></pre>