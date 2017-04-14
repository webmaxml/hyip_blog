<?php 

class Article_Tabs {

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
		$this->new_args = array(
			'post_type' => 'article',
			'order' => 'DESC',
			'orderby' => 'date',
			'posts_per_page' => 5
		);

		$this->comments_args = array(
			'post_type' => 'article',
			'order' => 'DESC',
			'orderby' => 'comment_count',
			'posts_per_page' => 5
		);

		$this->views_args = array(
			'post_type' => 'article',
			'order' => 'DESC',
			'orderby' => 'post_views',
			'posts_per_page' => 5,
			'fields' => ''
		);

	}

	public function get_posts( $args ) {
		$query = new WP_Query( $args );
		$posts = array();

		while ( $query->have_posts() ) {
			$query->the_post(); 
			$posts[] = $this->article->get_post( $query->post );
		}
		wp_reset_postdata();

		return $posts;
	}

	public function get_top_new_posts() {
		return $this->get_posts( $this->new_args );
	}

	public function get_top_comments_posts() {
		return $this->get_posts( $this->comments_args );
	}

	public function get_top_views_posts() {
		return $this->get_posts( $this->views_args );
	}
}

?>