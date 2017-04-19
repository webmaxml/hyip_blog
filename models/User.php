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

}

?>