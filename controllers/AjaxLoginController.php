<?php

class Ajax_Login_Controller {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->user = Hyip_User::get_instance();
	}

	public function init() {
		add_action( 'wp_ajax_nopriv_hyip_log', array( $this, 'login_user' ) );
	}

	public function login_user() {
		$nonce = isset( $_POST[ '_wpnonce' ] ) ? $_POST[ '_wpnonce' ] : '';
		$nonce_verified = wp_verify_nonce( $nonce, 'hyip_logining' );

		if ( !$nonce_verified ) { 
			wp_send_json_error( 'Ошибка верификации формы' ); 
		}

		$login = isset( $_POST[ 'login' ] ) ? sanitize_user( $_POST[ 'login' ] ) : false;
		$pwd = isset( $_POST[ 'password' ] ) ? $_POST[ 'password' ] : false;
		$rememberme = isset( $_POST[ 'rememberme' ] ) ? $_POST[ 'rememberme' ] : false;

		if ( $login === false || $pwd === false ) {
			wp_send_json_error( 'Логин или пароль не заданы. По идее такого не может быть. Однако...' ); 
		}

		$result = $this->user->login_user( $login, $pwd, $rememberme );

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( $result->get_error_message() );
		} else {
			wp_send_json_success();
		}

	}

}

?>