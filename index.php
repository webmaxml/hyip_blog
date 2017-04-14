<?php 

$tabs = Article_Tabs::get_instance();

?>

<pre><?php print_r( $tabs->get_top_views_posts() ); ?></pre>