<?php

class Ajax_Registration_Controller {

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
		add_action( 'wp_ajax_nopriv_hyip_reg', array( $this, 'register_user' ) );
	}

	public function register_user() {
		$nonce = isset( $_POST[ '_wpnonce' ] ) ? $_POST[ '_wpnonce' ] : '';
		$nonce_verified = wp_verify_nonce( $nonce, 'hyip_registration' );

		if ( !$nonce_verified ) { 
			wp_send_json_error( 'Ошибка верификации формы' ); 
		}

		$login = isset( $_POST[ 'login' ] ) ? $_POST[ 'login' ] : false;
		$pwd = isset( $_POST[ 'password' ] ) ? $_POST[ 'password' ] : false;
		$email = isset( $_POST[ 'email' ] ) ? $_POST[ 'email' ] : false;

		if ( $login === false || $pwd === false || $email === false ) {
			wp_send_json_error( 'Логин, пароль или email не заданы. По идее такого не может быть. Однако...' ); 
		}

		$reg_result = $this->user->create_user( $login, $pwd, $email );

		if ( is_wp_error( $reg_result ) ) {
			wp_send_json_error( $reg_result->get_error_message() );
		} 

		$log_result = $this->user->login_user( $login, $pwd, true );
		
		if ( is_wp_error( $log_result ) ) {
			wp_send_json_error( $log_result->get_error_message() );
		} else {
			wp_send_json_success();
		}
	}

}

?>