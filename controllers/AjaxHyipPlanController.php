<?php

class Ajax_Hyip_Plan_Controller {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->plan = Hyip_Plan::get_instance();
	}

	public function init() {
		add_action( 'wp_ajax_hyip_add_plan', array( $this, 'update_plan' ) );
		add_action( 'wp_ajax_hyip_update_plan', array( $this, 'update_plan' ) );
		add_action( 'wp_ajax_hyip_delete_plan', array( $this, 'delete_plan' ) );
	}

	private function is_nonce_verified() {
		$nonce = isset( $_POST[ '_wpnonce' ] ) ? $_POST[ '_wpnonce' ] : '';
		return wp_verify_nonce( $nonce, 'hyip_plan_proccessing' );
	}

	public function update_plan() {
		if ( !$this->is_nonce_verified() ) { wp_send_json_error( 'Ошибка верификации формы' ); }
		if ( !isset( $_POST[ 'hyip_id' ] ) ) { wp_send_json_error( 'Ошибка передачи объекта хайпа' ); }

		$hyip = get_post( $_POST[ 'hyip_id' ] );

		$args = array(
			'id' => isset( $_POST[ 'plan_id' ] ) ? (int) $_POST[ 'plan_id' ] : 0,
			'name' => isset( $_POST[ 'name' ] ) ? $_POST[ 'name' ] : '',
			'payment_percent' => isset( $_POST[ 'payment_percent' ] ) ? (float) $_POST[ 'payment_percent' ] : 0,
			'deposit_in_payments' => isset( $_POST[ 'deposit_in_payments' ] ) ? $_POST[ 'deposit_in_payments' ] : false,
			'payment_frequency' => isset( $_POST[ 'payment_frequency' ] ) ? (int) $_POST[ 'payment_frequency' ] : 0,
			'plan_period' => isset( $_POST[ 'plan_period' ] ) ? (int) $_POST[ 'plan_period' ] : 0,
			'refback_percent' => isset( $_POST[ 'refback_percent' ] ) ? (float) $_POST[ 'refback_percent' ] : 0,
			'min_deposit' => isset( $_POST[ 'min_deposit' ] ) ? (float) $_POST[ 'min_deposit' ] : 0,
			'max_deposit' => isset( $_POST[ 'max_deposit' ] ) ? (float) $_POST[ 'max_deposit' ] : 0
		);

		$result = $this->plan->update_plan( $args, $hyip );

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( $result->get_error_message() );
		}

		wp_send_json_success( $result );
	}

	public function delete_plan() {
		if ( !$this->is_nonce_verified() ) { wp_send_json_error( 'Ошибка верификации формы' ); }
		if ( !isset( $_POST[ 'plan_id' ] ) ) { wp_send_json_error( 'Ошибка передачи id плана' ); }

		$result = $this->plan->delete_plan( $_POST[ 'plan_id' ] );

		if ( $result ) {
			wp_send_json_success();
		} else {
			wp_send_json_error( 'Ошибка удаления' );
		}
	}

}

?>