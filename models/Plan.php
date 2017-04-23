<?php

class Hyip_Plan {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function get_plan( $plan ) {
		$result =  array(
			'name' => $plan->post_title,
			'payment_percent' => get_field( 'payment_percent', $plan->ID ),
			'deposit_in_payments' => get_field( 'deposit_in_payments', $plan->ID ),
			'payment_frequency' => get_field( 'payment_frequency', $plan->ID ),
			'plan_period' => get_field( 'plan_period', $plan->ID ),
			'refback_percent' => get_field( 'refback_percent', $plan->ID ),
			'min_deposit' => get_field( 'min_deposit', $plan->ID ),
			'max_deposit' => get_field( 'max_deposit', $plan->ID )
		);

		return $result;
	}

	public function update_plan( $args, $hyip ) {

		if ( !isset( $args[ 'id' ] ) ||
			 !isset( $args[ 'name' ] ) ||
			 !isset( $args[ 'min_deposit' ] ) ||
			 !isset( $args[ 'max_deposit' ] ) ||
			 !isset( $args[ 'plan_period' ] ) ||
			 !isset( $args[ 'deposit_in_payments' ] ) ||
			 !isset( $args[ 'payment_percent' ] ) ||
			 !isset( $args[ 'payment_frequency' ] ) ||
			 !isset( $args[ 'refback_percent' ] ) ) {
			return new WP_Error( 'not_full_args', 'Не полные данные для создания плана' );
		}

		$plan_id = wp_insert_post( array(
			'ID' => $args[ 'id' ],
			'post_type' => 'plan',
			'post_title' => $args[ 'name' ],
			'post_status' => 'publish',
			'post_parent' => (int) $hyip->ID,
		), true );

		if ( is_wp_error( $plan_id ) ) {
			return $plan_id;
		}

		update_field( 'field_58f7929817e91', $args[ 'min_deposit' ], $plan_id );
		update_field( 'field_58f792d417e92', $args[ 'max_deposit' ], $plan_id );
		update_field( 'field_58f792ec17e93', $args[ 'plan_period' ], $plan_id );
		update_field( 'field_58f794bb69edd', $args[ 'deposit_in_payments' ], $plan_id );
		update_field( 'field_58f7952614cd2', $args[ 'payment_percent' ], $plan_id );
		update_field( 'field_58f7959eaf7b8', $args[ 'payment_frequency' ], $plan_id );
		update_field( 'field_58fa2510d08ff', $args[ 'refback_percent' ], $plan_id );

		return get_post( $plan_id );
	}

	public function delete_plan( $plan_id ) {
		return wp_delete_post( (int) $plan_id, true );
	}
}

?>