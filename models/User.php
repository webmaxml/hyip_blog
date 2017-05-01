<?php

class Hyip_User {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function init() {
		add_action( 'user_register', array( $this, 'create_meta' ), 10, 1 );

		$this->user = wp_get_current_user();
	}

	public function is_logged() {
		return is_user_logged_in();
	}

	public function get_user() {
		return $this->user;
	}

	public function create_user( $login, $pwd, $email ) {
		return wp_create_user( $login, $pwd, $email );
	}

	public function login_user( $login, $pwd, $rememberme = false ) {
		$creds = array(
			'user_login' => $login,
			'user_password' => $pwd,
			'remember' => $rememberme
		);

		return wp_signon( $creds, false );
	}

	public function create_meta( $user_id ) {
		add_user_meta( $user_id, 'article_subscribed', 0 );
	}

}

?>