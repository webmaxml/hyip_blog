<?php

class Ajax_Login_Controller {

	private $user;
	private $ajax_action = 'hyip_log';

	private $nonce_field_name = '_wpnonce';
	private $nonce_action = 'hyip_logining';

	private $login_field_name = 'login';
	private $pwd_field_name = 'password';
	private $rememberme_field_name = 'rememberme';

	private $verify_error = 'Ошибка верификации формы';
	private $user_not_exist_error = 'Такого пользователя несуществует';
	private $login_error = 'Ошибка авторизации';

	public function __construct() {
		$this->user = Hyip_User::get_instance();

		add_action( 'wp_ajax_nopriv_' . $this->ajax_action, array( $this, 'login_user' ) );
	}

	private function is_nonce_verified() {
		$nonce = isset( $_POST[ $this->nonce_field_name ] ) ? 
				 $_POST[ $this->nonce_field_name ] : '';
		$nonce_verified = wp_verify_nonce( $nonce, $this->nonce_action );

		return $nonce_verified;
	}

	public function login_user() {
		if ( !$this->is_nonce_verified() ) { wp_send_json_error( $this->verify_error ); }

		$login = isset( $_POST[ $this->login_field_name ] ) ? 
					    $_POST[ $this->login_field_name ] : false;
		$pwd = isset( $_POST[ $this->pwd_field_name ] ) ? 
					  $_POST[ $this->pwd_field_name ] : false;
		$rememberme = isset( $_POST[ $this->rememberme_field_name ] ) ? 
							 $_POST[ $this->rememberme_field_name ] : false;

		if ( !$this->user->is_user_exist( $login ) ) { 
			wp_send_json_error( $this->user_not_exist_error ); 
		}
		
		$result = $this->user->login_user( $login, $pwd, $rememberme );

		return $result ? wp_send_json_success() : wp_send_json_error( $this->login_error );
	}

}

?>