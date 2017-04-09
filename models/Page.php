<?php

class Page {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}	

	public function init() {
		$this->current_page = get_query_var( 'page' ) > 1 ? get_query_var( 'page' ) : 1;
		$this->category_name = get_query_var( 'category_name' );
		$this->article = get_query_var( 'article' );
	}

	public function ajax_init() {
		$this->current_page = isset( $_POST[ 'currentPage' ] ) ? $_POST[ 'currentPage' ] : 1;
		$this->category_name = isset( $_POST[ 'category' ] ) ? $_POST[ 'category' ] : '';

		$this->form_ajax_page_name();
	}

	public function form_ajax_page_name() {
		$counter = 0;

		if ( $this->category_name ) {
			$this->page_name = 'category';
			$counter++;
		} else {
			$this->page_name = 'root';
			$counter++;
		}

		if ( $counter === 0 ) {
			throw new Exception( 'No page name found' );
		} else if ( $counter > 1 ) {
			throw new Exception( 'More than 1 page name found' );
		}
	}

	public function get_page_name() {
		return $this->page_name;
	}

	public function get_current_page() {
		return $this->current_page;
	}

	public function get_category_name() {
		return $this->category_name;
	}
	
}

?>