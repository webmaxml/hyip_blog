<?php 

$comments = Comments::get_instance();
$user = Hyip_user::get_instance();

?>

<pre><?php print_r( $comments->get_comments( get_post( 41 ) ) ); ?></pre>