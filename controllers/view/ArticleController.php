<?php 

class Article_Controller extends View_Controller {

	public function __construct() {
		$this->article = Article::get_instance();
	}

	protected function set_vars() {
		parent::set_vars();
		$this->post = $this->article->get_post();
	}

	public function get_view() {
		$this->set_vars();
		require '/../../views/article.php';
	}

}

?>