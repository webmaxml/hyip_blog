<?php 

class Ajax_Post_Loader_Controller {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->page = Page::get_instance();
	}	

	public function init() {
		add_action( 'wp_ajax_post_loader', array( $this, 'ajax_load_next_page' ) );
		add_action( 'wp_ajax_nopriv_post_loader', array( $this, 'ajax_load_next_page' ) );
	}

	public function ajax_load_next_page() {
		$this->get_post_handlers();

		$post_list = $this->post_index->get_next_page_posts();
		$html = $this->get_posts( $post_list );

		wp_send_json_success( array( 'html' => $html ) );
	}

	public function get_posts( $post_list ) {
		ob_start();
		foreach ( $post_list as $item ) {
			require $this->post_template;
		}	

		$html = ob_get_contents();
		ob_end_clean();

		return $html;
	}

	public function get_post_handlers() {
		switch ( $this->page->get_page_name() ) {
			case 'root':
			case 'category':
				$this->post_index = Article_Index::get_instance();
				$this->post_template = '/../../views/articleIndexItem.php'; 
				break;
		}
	}
}

?>