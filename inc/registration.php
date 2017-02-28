<?php

class Hyip_Register {
	
	private $nonce_field_name = '_wpnonce';
	private $action = 'hyip_reg';

	private $login_field_name = 'login';
	private $pwd_field_name = 'password';
	private $email_field_name = 'email';

	private $login = '';
	private $pwd = '';
	private $email = '';

	private $general_error = 'Ошибка регистрации';
	private $not_full_creds_error = 'Неполные данные для регистрации. Необходимы логин, email и пароль';
	private $login_exist_error = 'Пользователь с таким логином уже существует';

	private $success_reg_redirect;

	function __construct() {
		$this->success_reg_redirect = home_url();

		add_action( 'wp_ajax_' . $this->action, array( $this, 'register_user' ) );
	}

	function is_nonce_verified() {
		$nonce = isset( $_POST[ $this->nonce_field_name ] ) ? 
				 $_POST[ $this->nonce_field_name ] : '';
		$nonce_verified = wp_verify_nonce( $nonce, $this->action );

		return $nonce_verified;
	}

	function write_creds() {
		$this->login = isset( $_POST[ $this->login_field_name ] ) ? 
						$_POST[ $this->login_field_name ] : false;
		$this->pwd = isset( $_POST[ $this->pwd_field_name ] ) ? 
					  $_POST[ $this->pwd_field_name ] : false;
		$this->email = isset( $_POST[ $this->email_field_name ] ) ? 
						$_POST[ $this->email_field_name ] : false;
	}

	function reset_creds() {
		$this->login = '';
		$this->pwd = '';
		$this->email = '';
	}

	function is_creds_exist() {
		return $this->login && $this->pwd && $this->email;
	}

	function is_login_free() {
		return !get_user_by( 'login', $this->login );
	}

	function register_user() {
		if ( !$this->is_nonce_verified() ) { wp_send_json_error( $this->general_error ); }

		$this->write_creds();

		if ( !$this->is_creds_exist() ) { wp_send_json_error( $this->not_full_creds_error ); }
		if ( !$this->is_login_free() ) { wp_send_json_error( $this->login_exist_error ); }

		$user = wp_create_user( $this->login, $this->pwd, $this->email );
		$this->reset_creds();

		if ( is_wp_error( $user ) ) { wp_send_json_error( $this->general_error ); }

		wp_send_json_success( $this->success_reg_redirect );
	}
}

$hyip_register = new Hyip_Register;

?>