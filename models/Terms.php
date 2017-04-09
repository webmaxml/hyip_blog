<?php

class Terms {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function get_link_data( $taxonomy, $post = false ) {
		if ( $post ) {
			$terms = get_the_terms( $post, $taxonomy );
		} else {
			$terms = get_terms( array(
				'taxonomy' => $taxonomy,
				'order' => 'DESC' 
			) );
		}

		$result = array();
		foreach ( $terms as $term ) {
			$result[] = array( 
				'name' => $term->name,
				'href' => get_term_link( $term->term_id, $taxonomy ) 
			);
		}

		return $result;
	}

}

?>