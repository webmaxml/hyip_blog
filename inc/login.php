<?php

class Hyip_Login {

	private $ajax_action = 'hyip_log';
	
	private $nonce_field_name = '_wpnonce';
	private $nonce_action = 'hyip_logining';

	private $login_field_name = 'login';
	private $pwd_field_name = 'password';
	private $rememberme_field_name = 'rememberme';

	private $login = '';
	private $pwd = '';
	private $rememberme = '';

	private $verify_error = 'Ошибка верификации формы';
	private $not_full_creds_error = 'Неполные данные для авторизации. Необходимы логин и пароль';
	private $user_not_exist_error = 'Такого пользователя несуществует';
	private $login_error = 'Неверный пароль';

	function __construct() {
		add_action( 'wp_ajax_nopriv_' . $this->ajax_action, array( $this, 'login_user' ) );
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
		$this->rememberme = isset( $_POST[ $this->rememberme_field_name ] ) ? 
							$_POST[ $this->rememberme_field_name ] : false;
	}

	function reset_creds() {
		$this->login = '';
		$this->pwd = '';
		$this->rememberme = '';
	}

	function is_creds_full() {
		return $this->login && $this->pwd;
	}

	function is_user_exist() {
		return get_user_by( 'login', $this->login );
	}

	function login_user() {
		if ( !$this->is_nonce_verified() ) { wp_send_json_error( $this->verify_error ); }

		$this->write_creds();

		if ( !$this->is_creds_full() ) { wp_send_json_error( $this->not_full_creds_error ); }
		if ( !$this->is_user_exist() ) { wp_send_json_error( $this->user_not_exist_error ); }

		$creds = array(
			'user_login' => $this->login,
			'user_password' => $this->pwd,
			'remember' => $this->rememberme
		);

		$user = wp_signon( $creds, false );

		if ( is_wp_error( $user ) ) { wp_send_json_error( $this->login_error ); }

		$this->reset_creds();

		wp_send_json_success();
	}

}

$hyip_login = new Hyip_Login;

?>