<?php

class Filters {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function init() {
		add_filter( 'nav_menu_link_attributes', array( $this, 'set_menu_link_attrs' ), 10, 3 );
		add_filter( 'excerpt_length', array( $this, 'set_custom_excerpt_length' ), 999 );
	}

	function set_menu_link_attrs( $atts, $item ) {

		$atts['class'] = 'main-menu__nav-link';

		global $hyip_config;

		$item_id = $item->ID;
		$add_hyip_id = 24;
		$refback_id = 25;

		if ( $item_id === $add_hyip_id ) {
			$atts['href'] = '#';
			$atts['data-modal-trigger'] = 'addHyip';
		}

		if ( $item_id === $refback_id ) {
			$atts['href'] = '#';
			$atts['data-modal-trigger'] = 'refback';
		}

		return $atts;
	}

	function set_custom_excerpt_length( $length ) {
	    return 100;
	}

}

?>