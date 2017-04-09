<?php 

class Article_Index {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->page = Page::get_instance();
		$this->article = Article::get_instance();
	}

	public function init() {
		$this->query_args = array(
			'post_type' => 'article',
			'paged' => $this->page->get_current_page(),
			'category_name' => $this->page->get_category_name(),
			'posts_per_page' => get_option( 'posts_per_page' )
		);

		$query = new WP_Query( $this->query_args );
		$this->max_num_pages = $query->max_num_pages;
	}

	public function get_max_pages() {
		return $this->max_num_pages;
	}

	public function get_posts() {
		$query = new WP_Query( $this->query_args );
		$posts = array();

		while ( $query->have_posts() ) {
			$query->the_post(); 
			$posts[] = $this->article->get_post( $query->post );
		}
		wp_reset_postdata();

		return $posts;
	}

	public function get_next_page_posts() {
		$this->query_args[ 'paged' ] = ++$this->query_args[ 'paged' ];
		return $this->get_posts();
	}

	public function get_posts_till_current_page() {
		$posts = array();
		$current_page = $this->page->get_current_page() < $this->max_num_pages ?
						$this->page->get_current_page() : $this->max_num_pages;

		for ( $i = 1; $i <= $current_page; $i++ ) {
			$this->query_args[ 'paged' ] = $i;
			$posts = array_merge( $posts, $this->get_posts() );
		}

		return $posts;
	}

}

?>