<?php

function hyip_user_login() {
	$answer = array(
		'nonce_not_verified' => true,
		'no_login' => false,
		'no_password' => false,
		'no_such_user' => false,
		'wrong_password' => false,
		'redirect' => false,
	);

	$nonce = isset( $_POST['_wpnonce'] ) ? $_POST['_wpnonce'] : '';
	$nonce_verified = wp_verify_nonce( $nonce, 'login_nonce' );

	if ( $nonce_verified ) {

		$answer['nonce_not_verified'] = false;

		$log = isset( $_POST['login'] ) ? $_POST['login'] : false;
		$pwd = isset( $_POST['password'] ) ? $_POST['password'] : false;
		$rememberme = isset( $_POST['remember'] ) ? $_POST['remember'] : false;

		if ( !$log ) { 
			$answer['no_login'] = true;
			wp_send_json_error( $answer ); 
		}

		if ( !$pwd ) { 
			$answer['no_password'] = true;
			wp_send_json_error( $answer ); 
		}

		$user = get_user_by( 'login', $log );
		$user = $user ? $user : get_user_by( 'email', $log );

		if ( !$user ) {
			$answer['no_such_user'] = true;
			wp_send_json_error( $answer ); 
		}

		$creds = array(
			'user_login' => $log,
			'user_password' => $pwd,
			'remember' => $rememberme
		);

		$user = wp_signon( $creds, false );

		if ( is_wp_error( $user ) ) {
			$answer['wrong_password'] = true;
			wp_send_json_error( $answer );
		}

		$answer['redirect'] = home_url();
		wp_send_json_success( $answer );

	}

	wp_send_json_error( $answer );

	wp_die();
}
add_action( 'wp_ajax_nopriv_hyip_login', 'hyip_user_login' );


require 'config/config.php';
require 'inc/theme_setup.php';
require 'inc/registration.php';


?>