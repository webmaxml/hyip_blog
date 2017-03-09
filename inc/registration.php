<?php

class Hyip_Register {

	private $ajax_action = 'hyip_reg';
	
	private $nonce_field_name = '_wpnonce';
	private $nonce_action = 'hyip_registration';

	private $login_field_name = 'login';
	private $pwd_field_name = 'password';
	private $email_field_name = 'email';

	private $login = '';
	private $pwd = '';
	private $email = '';

	private $creating_error = 'Ошибка создания нового пользователя';
	private $login_error = 'Ошибка авторизации пользователя';
	private $verify_error = 'Ошибка верификации формы';
	private $not_full_creds_error = 'Неполные данные для регистрации. Необходимы логин, email и пароль';
	private $login_exist_error = 'Пользователь с таким логином уже существует';

	function __construct() {
		add_action( 'wp_ajax_nopriv_' . $this->ajax_action, array( $this, 'register_user' ) );
	}

	function is_nonce_verified() {
		$nonce = isset( $_POST[ $this->nonce_field_name ] ) ? 
				 $_POST[ $this->nonce_field_name ] : '';
		$nonce_verified = wp_verify_nonce( $nonce, $this->nonce_action );

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

	function is_creds_full() {
		return $this->login && $this->pwd && $this->email;
	}

	function is_login_free() {
		return !get_user_by( 'login', $this->login );
	}

	function register_user() {
		if ( !$this->is_nonce_verified() ) { wp_send_json_error( $this->verify_error ); }

		$this->write_creds();

		if ( !$this->is_creds_full() ) { wp_send_json_error( $this->not_full_creds_error ); }
		if ( !$this->is_login_free() ) { wp_send_json_error( $this->login_exist_error ); }

		$this->create_user();
		$this->login_user();
		$this->reset_creds();

		wp_send_json_success();
	}

	function create_user() {
		$user = wp_create_user( $this->login, $this->pwd, $this->email );
		
		if ( is_wp_error( $user ) ) { wp_send_json_error( $this->creating_error ); }
	}

	function login_user() {
		$creds = array(
			'user_login' => $this->login,
			'user_password' => $this->pwd,
			'remember' => true
		);

		$user = wp_signon( $creds, false );

		if ( is_wp_error( $user ) ) { wp_send_json_error( $this->login_error ); }
	}
}

$hyip_register = new Hyip_Register;

?>