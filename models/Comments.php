<?php

class Comments {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function get_number( $post ) {
		return get_comments_number( $post->ID );
	}

	public function get_comments_string( $post ) {
		$number = $this->get_number( $post );

		switch ( $number ) {
			case 0:
				return '0 комментариев';
			case 1:
				return '1 комментарий';
			default:
				return $number . ' комментариев';
		}
	}

}

?>