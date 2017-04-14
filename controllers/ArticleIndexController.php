<?php 

class Article_Index_Controller extends View_Controller {

	public function __construct() {
		$this->article_index = Article_Index::get_instance();
	}

	protected function set_vars() {
		parent::set_vars();
		$article_list = $this->article_index->get_posts_till_current_page();

		$this->max_num_pages = $this->article_index->get_max_pages();
		$this->posts = $this->get_articles( $article_list );
	}

	public function get_articles( $article_list ) {
		ob_start();
		foreach ( $article_list as $item ) {
	        require '/../views/articleIndexItem.php';
	    }
	    $html = ob_get_contents();
		ob_end_clean();

		return $html;
	}

	public function get_view() {
		$this->set_vars();
		require '/../views/postIndex.php';
	}

}

?>