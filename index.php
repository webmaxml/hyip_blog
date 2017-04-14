<?php 

$comments = Comments::get_instance();

?>

<pre><?php print_r( $comments->get_comments( get_post( 41 ) ) ); ?></pre>