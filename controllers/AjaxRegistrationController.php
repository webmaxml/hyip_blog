<?php

class Ajax_Registration_Controller {

	private $user;
	private $ajax_action = 'hyip_reg';
	
	private $nonce_field_name = '_wpnonce';
	private $nonce_action = 'hyip_registration';

	private $login_field_name = 'login';
	private $pwd_field_name = 'password';
	private $email_field_name = 'email';

	private $creating_error = 'Ошибка создания нового пользователя';
	private $login_error = 'Ошибка авторизации пользователя';
	private $verify_error = 'Ошибка верификации формы';
	private $login_exist_error = 'Пользователь с таким логином уже существует';

	public function __construct() {
		$this->user = Hyip_User::get_instance();

		add_action( 'wp_ajax_nopriv_' . $this->ajax_action, array( $this, 'register_user' ) );
	}

	private function is_nonce_verified() {
		$nonce = isset( $_POST[ $this->nonce_field_name ] ) ? 
				 $_POST[ $this->nonce_field_name ] : '';
		$nonce_verified = wp_verify_nonce( $nonce, $this->nonce_action );

		return $nonce_verified;
	}

	public function register_user() {
		if ( !$this->is_nonce_verified() ) { wp_send_json_error( $this->verify_error ); }

		$login = isset( $_POST[ $this->login_field_name ] ) ? 
						$_POST[ $this->login_field_name ] : false;
		$pwd = isset( $_POST[ $this->pwd_field_name ] ) ? 
					  $_POST[ $this->pwd_field_name ] : false;
		$email = isset( $_POST[ $this->email_field_name ] ) ? 
						$_POST[ $this->email_field_name ] : false;

		if ( $this->user->is_user_exist( $login ) ) { 
			wp_send_json_error( $this->login_exist_error ); 
		}

		$new_user = $this->user->create_user( $login, $pwd, $email );
		if ( !$new_user ) { wp_send_json_error( $this->creating_error ); }

		$user = $this->user->login_user( $login, $pwd, true );
		if ( !user ) { wp_send_json_error( $this->login_error ); }

		wp_send_json_success();
	}

}

?>