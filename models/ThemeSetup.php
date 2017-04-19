<?php

class Theme_Setup {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance )  ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function init() {
		$this->remove_default_actions();

		add_action( 'after_setup_theme', array( $this, 'add_theme_support' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts' ) );
		add_action( 'init', array( $this, 'set_users_options' ) );
		add_action( 'comment_post', array( $this, 'add_comment_rating' ) );
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

	function add_admin_scripts() {
		$screen = get_current_screen();

		if ( is_object( $screen ) ) {

			if ( in_array( $screen->post_type, [ 'hyip' ] ) ) {
				wp_enqueue_script( 'hyip-admin-script', get_template_directory_uri() . '/assets/js/admin.js', [ 'jquery' ], time(), true );
			}

		}
	}

	function include_data_in_scripts() {
		$user = is_user_logged_in() ? wp_get_current_user() : false;
		$user_data = array(
			'loggedIn' => false
		);

		if ( $user ) {
			$user_data[ 'loggedIn' ] = true;
			$user_data[ 'login' ] = $user->data->user_login;
		}

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

	function add_comment_rating( $comment_id ) {
		add_comment_meta( $comment_id, 'c_rating', 0 );
	}
	
}

?>