<?php

class Plan {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		
	}

	public function create_plan() {
		
	}

	
}

?>