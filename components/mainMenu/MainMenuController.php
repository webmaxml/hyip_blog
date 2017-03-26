<?php 

class Main_Menu_Controller extends View_Controller {

	public function __construct() {}

	public function set_vars() {
		parent::set_vars();
	}

	public function get_component() {
		$this->set_vars();
		require 'mainMenu.php';
	}

}

?>