<?php

class Hyip_User_Stats {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function init() {
		add_action( 'user_register', array( $this, 'create_statistics' ), 10, 1 );
	}

	public function get_stats( $user_id ) {
		$stats = get_posts( array(
			'post_type' => 'user_stats',
			'author' => $user_id
		) );

		if ( count( $stats ) > 1 ) {
			throw new Exception( count( $stats ) . ' stats objects found for user ' . $user_id );
		}

		if ( empty( $stats ) ) {
			return false;
		} else  {
			return $stats[0];
		}
	}

	public function create_statistics( $user_id ) {
		$stats = $this->get_stats( $user_id );

		if ( $stats ) {
			throw new Exception( 'stats already exist for this user' );
		}

		$stat_id = wp_insert_post( array(
			'post_type' => 'user_stats',
			'post_title' => get_userdata( $user_id )->user_login,
			'post_status' => 'publish',
			'post_author' => $user_id,
		), true );

		if ( is_wp_error( $stat_id ) ) {
			throw new Exception( 'User stats are not created' );
		}
	}

}

?>