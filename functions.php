<?php

require 'config/config.php';
require 'inc/theme_setup.php';
require 'inc/articles.php';
require 'inc/registration.php';
require 'inc/login.php';
require 'widgets/Logo.php';

function get_comments_string( $comments_num ) {
	switch ( $comments_num ) {
		case 0:
			return '0 комментариев';
		case 1:
			return '1 комментарий';
		default:
			return $comments_num . ' комментариев';
	}
}

?>