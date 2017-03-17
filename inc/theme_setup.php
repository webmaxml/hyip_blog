<?php

class Hyip_Theme_Setup {

	function __construct() {
		$this->remove_default_actions();

		add_action( 'after_setup_theme', array( $this, 'add_theme_support' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );
		add_action( 'init', array( $this, 'set_users_options' ) );
		add_action( 'widgets_init', array( $this, 'remove_default_widgets' ) );
		add_action( 'widgets_init', array( $this, 'register_theme_sidebars' ) );

		add_filter( 'nav_menu_link_attributes', array( $this, 'set_menu_link_attrs' ), 10, 3 );
		add_filter( 'excerpt_length', array( $this, 'set_custom_excerpt_length' ), 999 );
	}

	function remove_default_actions() {
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'rest_output_link_wp_head', 10);
		remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		remove_action( 'wp_head', 'wp_oembed_add_host_js' );
		remove_action( 'template_redirect', 'rest_output_link_header', 11);
		remove_action( 'the_excerpt', 'convert_smilies' );
		remove_action( 'the_content', 'convert_smilies', 20 );
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

	function add_theme_support() {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		register_nav_menu( 'main_menu', 'Главное меню' );
	}

	function add_scripts() {
		wp_enqueue_style( 'style', get_template_directory_uri() . '/_dev/dist/style.min.css', array(), time() );
		wp_enqueue_script( 'script', get_template_directory_uri() . '/_dev/dist/app.min.js', array(), time(), true );

		$this->include_data_in_scripts();
	}

	function include_data_in_scripts() {
		$user = is_user_logged_in() ? wp_get_current_user() : false;
		$user_data = array(
			'registered' => false
		);

		if ( $user ) {
			$user_data[ 'registered' ] = true;
			$user_data[ 'login' ] = $user->data->user_login;
		}

		//-------------------------------------------------

		wp_localize_script( 'script', 'globalData', array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'user' => $user_data
		) );
	}

	function set_users_options() {
		// disable admin bar for every user
		show_admin_bar( false );

		$is_admin_panel_loading = is_admin();
		$is_not_ajax_call = !( defined( 'DOING_AJAX' ) && DOING_AJAX );
		$is_logged = is_user_logged_in();
		$is_not_admin = !current_user_can( 'manage_options' );

		if ( $is_admin_panel_loading && 
			 $is_not_ajax_call && 
			 $is_logged &&
			 $is_not_admin ) {

			wp_redirect( home_url() );
			exit;
		}
	}

	function register_theme_sidebars() {
		register_sidebar( array(
			'name' => 'Logo Sidebar',
			'id' => 'logo_sidebar'
		) );
	}

	function set_menu_link_attrs( $atts, $item ) {

		$atts['class'] = 'main-menu__nav-link';

		global $hyip_config;

		$item_id = $item->ID;
		$add_hyip_id = $hyip_config[ 'menu_items' ][ 'add_hyip' ][ 'id' ];
		$refback_id = $hyip_config[ 'menu_items' ][ 'refback' ][ 'id' ];

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



$hyip_theme_setup = new Hyip_Theme_Setup;

?>