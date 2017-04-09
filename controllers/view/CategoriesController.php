<?php 

class Categories_Controller extends View_Controller {

	public function __construct() {
		$this->terms = Terms::get_instance();
	}

	public function set_vars() {
		parent::set_vars();

		$this->cats = $this->terms->get_link_data( 'category' );
	}

	public function get_view() {
		$this->set_vars();
		require '/../../views/categories.php';
	}
}

?>