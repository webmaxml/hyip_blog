<?php

class Widgets {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function init() {
		add_action( 'widgets_init', array( $this, 'remove_default_widgets' ) );
		add_action( 'widgets_init', array( $this, 'register_theme_sidebars' ) );
	}

	function remove_default_widgets() {
		unregister_widget( 'WP_Nav_Menu_Widget' );
		unregister_widget( 'WP_Widget_Archives' );
		unregister_widget( 'WP_Widget_Calendar' );
		unregister_widget( 'WP_Widget_Categories' );
		unregister_widget( 'WP_Widget_Links' );
		unregister_widget( 'WP_Widget_Meta' );
		unregister_widget( 'WP_Widget_Pages' );
		unregister_widget( 'WP_Widget_Recent_Comments' );
		unregister_widget( 'WP_Widget_Recent_Posts' );
		unregister_widget( 'WP_Widget_RSS' );
		unregister_widget( 'WP_Widget_Search' );
		unregister_widget( 'WP_Widget_Tag_Cloud' );
	}

	function register_theme_sidebars() {
		register_sidebar( array(
			'name' => 'Logo Sidebar',
			'id' => 'logo_sidebar'
		) );
	}

}

?>