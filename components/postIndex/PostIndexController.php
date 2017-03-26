<?php 

class Post_Index_Controller extends View_Controller {

	private $ajax_action = 'post_loader';

	public function __construct() {
		$this->query_args = array(
			'post_type' => 'article',
			'posts_per_page' => get_option( 'posts_per_page' )
		);

		add_action( 'wp_ajax_' . $this->ajax_action, array( $this, 'ajax_load_next_page' ) );
		add_action( 'wp_ajax_nopriv_' . $this->ajax_action, array( $this, 'ajax_load_next_page' ) );
	}

	public function set_vars() {
		parent::set_vars();

		$query = new WP_Query( $this->query_args );

		$this->max_num_pages = $query->max_num_pages;
		$this->current_page = get_query_var( 'page' ) > 1 ? get_query_var( 'page' ) : 1;
		$this->current_page = $this->current_page < $this->max_num_pages ? 
							  $this->current_page : $this->max_num_pages;

		$this->posts_list = $this->get_posts_till_current_page();
	}

	public function get_component() {
		$this->set_vars();
		require 'postIndex.php';
	}

	public function get_posts_till_current_page() {
		$args = $this->query_args;
		$html = '';

		for ( $i = 1; $i <= $this->current_page; $i++ ) {
			$args[ 'paged' ] = $i;
			$html .= $this->get_posts( $args );
		}

		return $html;
	}

	public function get_posts( $args ) {
		$query = new WP_Query( $args );

		ob_start();
		if ( $query->have_posts() ) { 
			while ( $query->have_posts() ) {
				$query->the_post(); 
				require 'articlePost.php';
			}
			wp_reset_postdata();
		}
		$html = ob_get_contents();
		ob_end_clean();

		return $html;
	}

	public function ajax_load_next_page() {
		$currentPage = isset( $_POST[ 'currentPage' ] ) ? $_POST[ 'currentPage' ] : false;

		if ( $currentPage ) {
			$args = $this->query_args;
			$args[ 'paged' ] = ++$currentPage;

			$html = $this->get_posts( $args );

			wp_send_json_success( array( 'html' => $html ) );
		}
	}
}

?>