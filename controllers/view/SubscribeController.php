<?php 

class Subscribe_Controller extends View_Controller {

	public function __construct() {}

	public function set_vars() {
		parent::set_vars();
	}

	public function get_view() {
		$this->set_vars();
		require '/../../views/subscribe.php';
	}

}

?>