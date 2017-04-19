<?php 

class Post_Tabs_Controller extends View_Controller {

	public function __construct() {
		$this->tabs = Article_Tabs::get_instance();
	}

	public function set_vars() {
		parent::set_vars();

		$this->new_posts = $this->tabs->get_top_new_posts();
		$this->comments_posts = $this->tabs->get_top_comments_posts();
		$this->views_posts = $this->tabs->get_top_views_posts();
	}

	public function get_view() {
		$this->set_vars();
		require '/../views/postTabs.php';
	}

}

?>